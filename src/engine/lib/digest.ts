import { eq, desc, sql } from 'drizzle-orm';
import { streamText, Output, isStepCount } from 'ai';

import { db } from './db';
import { anthropic } from '@/engine/config/providers';
import { appendRunLog, finishRun } from './generation-runs';
import { digestEntries } from '@/engine/schemas/db/digest';
import { entriesSchema } from '@/engine/schemas/zod/digest';
import { GENERATION_PROMPT, GENERATION_MODEL, GENERATION_MAX_OUTPUT_TOKENS, GENERATION_MAX_SEARCHES } from '@/engine/config/generation';
import type { DigestEntry, DigestLink } from '@/engine/types/digest';

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
  let webSearchRequests = 0;

  try {
    const result = streamText({
      model: anthropic(GENERATION_MODEL),
      maxOutputTokens: GENERATION_MAX_OUTPUT_TOKENS,
      system: GENERATION_PROMPT,
      prompt: 'Find recent AI/software engineering items worth digesting.',
      tools: {
        web_search: anthropic.tools.webSearch_20250305({ maxUses: GENERATION_MAX_SEARCHES }),
      },
      output: Output.object({ schema: entriesSchema }),
      stopWhen: isStepCount(GENERATION_MAX_SEARCHES * 2 + 5),
    });

    for await (const part of result.stream) {
      if (part.type === 'tool-call' && part.toolName === 'web_search') {
        webSearchRequests += 1;
        const query = (part.input as { query?: string } | undefined)?.query;
        await appendRunLog(runId, `searching: ${query ?? '(unknown query)'}`);
      }
      if (part.type === 'tool-result' && part.toolName === 'web_search') {
        await appendRunLog(runId, 'search returned results');
      }
    }

    const parsed = await result.output;

    if (parsed) {
      for (const entry of parsed.entries) {
        const draft = await createDraft(entry);
        drafts.push(draft);
        await appendRunLog(runId, `created draft: ${draft.title}`);
      }
    } else {
      await appendRunLog(runId, 'generation finished without producing a parsed result');
    }

    const usage = await result.usage;

    await finishRun(runId, 'done', {
      draftsCreated: drafts.length,
      model: GENERATION_MODEL,
      inputTokens: usage.inputTokens ?? 0,
      outputTokens: usage.outputTokens ?? 0,
      webSearchRequests,
    });
  } catch (err) {
    await appendRunLog(runId, `error: ${err instanceof Error ? err.message : String(err)}`);
    await finishRun(runId, 'error', { draftsCreated: drafts.length, model: GENERATION_MODEL, webSearchRequests });
    throw err;
  }

  return drafts;
}
