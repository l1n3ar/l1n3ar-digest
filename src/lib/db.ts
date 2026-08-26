import { neon } from '@neondatabase/serverless';

import type { DigestEntry } from '@/types/digest';
import { mapDigestRow } from '@/utils/digest';

export const sql = neon(process.env.DATABASE_URL!);

export async function getEntries(): Promise<DigestEntry[]> {
  const rows = await sql`
    SELECT id, title, summary, topic, links, build_idea, status, created_at, published_at
    FROM digest_entries
    WHERE status = 'published'
    ORDER BY published_at DESC
  `;
  return rows.map(mapDigestRow);
}
