import type { DigestEntry } from "@/lib/db";

const entries: DigestEntry[] = [
  {
    id: "1",
    title: "Structured outputs are quietly becoming the default way to call LLMs",
    summary:
      "More providers are pushing JSON-schema-constrained generation as the primary interface, not an add-on. It removes a whole class of parsing bugs and makes tool use far more reliable in production.",
    topic: "LLM tooling",
    links: [
      { label: "Structured outputs, explained", url: "https://example.com/structured-outputs", kind: "article" },
    ],
    buildIdea:
      "A CLI that wraps any API response in a schema-validated retry loop, so flaky JSON never reaches your app code.",
    publishedAt: "2026-08-24T09:00:00.000Z",
  },
  {
    id: "2",
    title: "Vector search is being replaced by hybrid retrieval almost everywhere",
    summary:
      "Pure embedding similarity keeps losing to BM25 + reranker combos on real-world corpora. The pattern now: cheap lexical pass, small candidate set, then a cross-encoder rerank.",
    topic: "Retrieval",
    links: [
      { label: "Hybrid search in production", url: "https://example.com/hybrid-search", kind: "article" },
      { label: "Rerankers explained", url: "https://example.com/rerankers", kind: "video" },
    ],
    buildIdea: null,
    publishedAt: "2026-08-22T09:00:00.000Z",
  },
  {
    id: "3",
    title: "Small on-device models are good enough for real UI features now",
    summary:
      "Sub-1B models running in-browser via WebGPU can handle classification, autocomplete ranking, and light summarization without a network round trip.",
    topic: "On-device ML",
    links: [
      { label: "WebGPU inference in 2026", url: "https://example.com/webgpu-inference", kind: "video" },
    ],
    buildIdea:
      "A browser extension that ranks your open tabs by relevance to what you're currently typing, entirely offline.",
    publishedAt: "2026-08-19T09:00:00.000Z",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Entry({ entry }: { entry: DigestEntry }) {
  return (
    <details className="group border-b border-foreground/10 pb-8">
      <summary className="flex list-none flex-col gap-2 cursor-pointer [&::-webkit-details-marker]:hidden">
        <h2 className="text-[15px] font-medium leading-snug">{entry.title}</h2>

        <div className="flex items-center gap-2 text-xs text-foreground/45">
          <span>{entry.topic}</span>
          <span>·</span>
          <time dateTime={entry.publishedAt}>{formatDate(entry.publishedAt)}</time>
        </div>
      </summary>

      <div className="mt-3 flex flex-col gap-2">
        <p className="text-[13px] leading-relaxed text-foreground/70">
          {entry.summary}
        </p>

        {entry.buildIdea && (
          <p className="text-xs leading-relaxed text-foreground/70">
            <span className="font-medium text-foreground">Build idea — </span>
            {entry.buildIdea}
          </p>
        )}

        {entry.links.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {entry.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <main className="flex flex-1 justify-center">
        <div className="w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
          {entries.length > 0 ? (
            <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/60">No entries yet.</p>
          )}
        </div>
      </main>

      <footer>
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 text-xs sm:px-8 lg:px-10">
          <p className="text-foreground/45">
            Built by{" "}
            <a
              href="https://github.com/l1n3ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              l1n3ar
            </a>
          </p>

          <a
            href="https://github.com/l1n3ar/l1n3ar-digest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/45 hover:text-foreground hover:underline"
          >
            Source on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
