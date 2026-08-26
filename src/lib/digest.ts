import { eq, desc, sql } from 'drizzle-orm';
import { jsonSchemaOutputFormat } from '@anthropic-ai/sdk/helpers/json-schema';
import { db } from './db';
import { anthropic } from './anthropic';
import { appendRunLog, finishRun } from './generation-runs';
import { digestEntries } from '@/schemas/db/digest';
import { GENERATION_PROMPT } from '@/data/prompts/digest';
import { ENTRIES_SCHEMA } from '@/schemas/json/digest';
import type { DigestEntry, DigestLink } from '@/types/digest';

const OUTPUT_FORMAT = jsonSchemaOutputFormat(ENTRIES_SCHEMA);

export async function createDraft(entry: {
  title: string;
  summary: string;
  topic: string;
  links: DigestLink[];
  buildIdea: string | null;
}): Promise<DigestEntry> {
  const [row] = await db.insert(digestEntries).values(entry).returning();
  return row;
}

export async function getEntries(): Promise<DigestEntry[]> {
  return db
    .select()
    .from(digestEntries)
    .where(eq(digestEntries.status, 'published'))
    .orderBy(desc(digestEntries.publishedAt));
}

export async function listDrafts(): Promise<DigestEntry[]> {
  return db
    .select()
    .from(digestEntries)
    .where(eq(digestEntries.status, 'draft'))
    .orderBy(desc(digestEntries.createdAt));
}

export async function publishEntry(id: string): Promise<void> {
  await db
    .update(digestEntries)
    .set({ status: 'published', publishedAt: sql`now()` })
    .where(eq(digestEntries.id, id));
}

export async function unpublishEntry(id: string): Promise<void> {
  await db
    .update(digestEntries)
    .set({ status: 'draft', publishedAt: null })
    .where(eq(digestEntries.id, id));
}

export async function deleteEntry(id: string): Promise<void> {
  await db.delete(digestEntries).where(eq(digestEntries.id, id));
}

export async function generateDrafts(runId: string): Promise<DigestEntry[]> {
  const drafts: DigestEntry[] = [];

  try {
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-5',
      max_tokens: 4096,
      system: GENERATION_PROMPT,
      messages: [{ role: 'user', content: 'Find recent AI/software engineering items worth digesting.' }],
      tools: [{ type: 'web_search_20260318', name: 'web_search', max_uses: 8 }],
      output_config: { format: OUTPUT_FORMAT },
    });

    stream.on('contentBlock', (block) => {
      if (block.type === 'server_tool_use' && block.name === 'web_search') {
        const query = (block.input as { query?: string } | undefined)?.query;
        void appendRunLog(runId, `searching: ${query ?? '(unknown query)'}`);
      }
      if (block.type === 'web_search_tool_result') {
        void appendRunLog(runId, 'search returned results');
      }
    });

    const message = await stream.finalMessage();
    const parsed = message.parsed_output;

    if (parsed) {
      for (const entry of parsed.entries) {
        const draft = await createDraft(entry);
        drafts.push(draft);
        await appendRunLog(runId, `created draft: ${draft.title}`);
      }
    }

    await finishRun(runId, 'done', drafts.length);
  } catch (err) {
    await appendRunLog(runId, `error: ${err instanceof Error ? err.message : String(err)}`);
    await finishRun(runId, 'error', drafts.length);
    throw err;
  }

  return drafts;
}
