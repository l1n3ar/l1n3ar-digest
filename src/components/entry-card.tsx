import type { ReactNode } from "react";
import type { DigestEntry } from "@/types/digest";
import { formatDate } from "@/utils/format-date";
import { H3, P, Muted, InlineLink } from "@/components/ui/typography";

export function EntryCard({ entry, actions }: { entry: DigestEntry; actions?: ReactNode }) {
  const date = entry.publishedAt ?? entry.createdAt;

  return (
    <details className="group border-b border-border pb-8">
      <summary className="flex list-none flex-col gap-2 cursor-pointer [&::-webkit-details-marker]:hidden">
        <H3>{entry.title}</H3>

        <Muted className="flex items-center gap-2">
          <span>{entry.topic}</span>
          <span>·</span>
          <time dateTime={date}>{formatDate(date)}</time>
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

        {actions && <div className="flex gap-4 pt-2">{actions}</div>}
      </div>
    </details>
  );
}
