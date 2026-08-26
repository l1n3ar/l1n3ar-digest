export type DigestLink = { label: string; url: string; kind: 'article' | 'video' };

export type DigestEntry = {
  id: string;
  title: string;
  summary: string;
  topic: string;
  links: DigestLink[];
  buildIdea: string | null;
  status: 'draft' | 'published';
  createdAt: string;
  publishedAt: string | null;
};
