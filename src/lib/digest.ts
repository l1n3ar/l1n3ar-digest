import { sql } from './db';
import { anthropic } from './anthropic';
import { mapDigestRow } from '@/utils/digest';
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
  const rows = await sql`
    INSERT INTO digest_entries (title, summary, topic, links, build_idea)
    VALUES (${entry.title}, ${entry.summary}, ${entry.topic}, ${JSON.stringify(entry.links)}, ${entry.buildIdea})
    RETURNING id, title, summary, topic, links, build_idea, status, created_at, published_at
  `;
  return mapDigestRow(rows[0]);
}

export async function getEntries(): Promise<DigestEntry[]> {
  const rows = await sql`
    SELECT id, title, summary, topic, links, build_idea, status, created_at, published_at
    FROM digest_entries
    WHERE status = 'published'
    ORDER BY published_at DESC
  `;
  return rows.map(mapDigestRow);
}

export async function listDrafts(): Promise<DigestEntry[]> {
  const rows = await sql`
    SELECT id, title, summary, topic, links, build_idea, status, created_at, published_at
    FROM digest_entries
    WHERE status = 'draft'
    ORDER BY created_at DESC
  `;
  return rows.map(mapDigestRow);
}

export async function publishEntry(id: string): Promise<void> {
  await sql`
    UPDATE digest_entries
    SET status = 'published', published_at = now()
    WHERE id = ${id}
  `;
}

export async function unpublishEntry(id: string): Promise<void> {
  await sql`
    UPDATE digest_entries
    SET status = 'draft', published_at = null
    WHERE id = ${id}
  `;
}

export async function deleteEntry(id: string): Promise<void> {
  await sql`DELETE FROM digest_entries WHERE id = ${id}`;
}

export async function generateDrafts(): Promise<DigestEntry[]> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 4096,
    system: GENERATION_PROMPT,
    messages: [{ role: 'user', content: 'Find recent AI/software engineering items worth digesting.' }],
    tools: [{ type: 'web_search_20260318', name: 'web_search' }],
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
