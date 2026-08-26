import { eq, desc, sql } from 'drizzle-orm';
import { db } from './db';
import { anthropic } from './anthropic';
import { digestEntries } from '@/schemas/db/digest';
import { GENERATION_PROMPT } from '@/data/prompts/digest';
import { ENTRIES_SCHEMA } from '@/schemas/json/digest';
import type { DigestEntry, DigestLink } from '@/types/digest';

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

export async function generateDrafts(): Promise<DigestEntry[]> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 4096,
    system: GENERATION_PROMPT,
    messages: [{ role: 'user', content: 'Find recent AI/software engineering items worth digesting.' }],
    tools: [{ type: 'web_search_20260318', name: 'web_search', max_uses: 8 }],
    output_config: { format: { type: 'json_schema', schema: ENTRIES_SCHEMA } },
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') return [];

  const parsed = JSON.parse(textBlock.text) as {
    entries: { title: string; summary: string; topic: string; links: DigestLink[]; buildIdea: string | null }[];
  };

  const drafts: DigestEntry[] = [];
  for (const entry of parsed.entries) {
    drafts.push(await createDraft(entry));
  }
  return drafts;
}
