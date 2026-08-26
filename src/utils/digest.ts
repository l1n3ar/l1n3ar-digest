import type { DigestEntry } from '@/types/digest';

export function mapDigestRow(r: any): DigestEntry {
  return {
    id: r.id,
    title: r.title,
    summary: r.summary,
    topic: r.topic,
    links: r.links,
    buildIdea: r.build_idea,
    status: r.status,
    createdAt: r.created_at,
    publishedAt: r.published_at,
  };
}
