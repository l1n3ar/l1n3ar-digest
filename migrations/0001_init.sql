CREATE TABLE digest_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  topic text NOT NULL,
  links jsonb NOT NULL DEFAULT '[]',
  build_idea text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
