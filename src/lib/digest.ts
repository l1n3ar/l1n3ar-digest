import { sql } from './db';
import { mapDigestRow } from '@/utils/digest';
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
