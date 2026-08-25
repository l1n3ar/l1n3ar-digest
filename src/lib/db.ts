import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export type DigestLink = { label: string; url: string; kind: 'article' | 'video' };

export type DigestEntry = {
  id: string;
  title: string;
  summary: string;
  topic: string;
  links: DigestLink[];
  buildIdea: string | null;
  publishedAt: string;
};

export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS digest_entries (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      summary text NOT NULL,
      topic text NOT NULL,
      links jsonb NOT NULL DEFAULT '[]',
      build_idea text,
      published_at timestamptz NOT NULL DEFAULT now()
    )
  `;
}

export async function insertEntries(entries: Omit<DigestEntry, 'id' | 'publishedAt'>[]) {
  for (const entry of entries) {
    await sql`
      INSERT INTO digest_entries (title, summary, topic, links, build_idea)
      VALUES (${entry.title}, ${entry.summary}, ${entry.topic}, ${JSON.stringify(entry.links)}, ${entry.buildIdea})
    `;
  }
}

export async function getEntries(): Promise<DigestEntry[]> {
  const rows = await sql`
    SELECT id, title, summary, topic, links, build_idea, published_at
    FROM digest_entries
    ORDER BY published_at DESC
  `;
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    summary: r.summary,
    topic: r.topic,
    links: r.links,
    buildIdea: r.build_idea,
    publishedAt: r.published_at,
  }));
}
