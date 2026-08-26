import { getEntries } from "@/lib/digest";
import type { DigestEntry } from "@/types/digest";
import { formatDate } from "@/utils/format-date";
import { H3, P, Muted, InlineLink } from "@/components/ui/typography";

function Entry({ entry }: { entry: DigestEntry }) {
  return (
    <details className="group border-b border-border pb-8">
      <summary className="flex list-none flex-col gap-2 cursor-pointer [&::-webkit-details-marker]:hidden">
        <H3>{entry.title}</H3>

        <Muted className="flex items-center gap-2">
          <span>{entry.topic}</span>
          <span>·</span>
          {entry.publishedAt && (
            <time dateTime={entry.publishedAt}>{formatDate(entry.publishedAt)}</time>
          )}
        </Muted>
      </summary>

      <div className="mt-3 flex flex-col gap-2">
        <P>{entry.summary}</P>

        {entry.buildIdea && (
          <Muted>
            <span className="font-medium text-foreground">Build idea — </span>
            {entry.buildIdea}
          </Muted>
        )}

        {entry.links.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {entry.links.map((link) => (
              <InlineLink key={link.url} href={link.url}>
                {link.label}
              </InlineLink>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

export default async function Home() {
  const entries = await getEntries();

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 justify-center">
        <div className="w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
          {entries.length > 0 ? (
            <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <Muted>No entries yet.</Muted>
          )}
        </div>
      </main>

      <footer>
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
          <Muted>
            Built by{" "}
            <a
              href="https://github.com/l1n3ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              l1n3ar
            </a>
          </Muted>

          <InlineLink href="https://github.com/l1n3ar/l1n3ar-digest" className="text-muted-foreground hover:text-foreground">
            Source on GitHub
          </InlineLink>
        </div>
      </footer>
    </div>
  );
}
