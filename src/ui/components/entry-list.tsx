import type { DigestEntry } from "@/engine/types/digest";
import { EntryCard } from "@/ui/components/entry-card";
import { LoadingSpinner } from "@/ui/components/loading-spinner";
import type { ReactNode } from "react";

export function EntryList({
  entries,
  isLoading,
  renderActions,
}: {
  entries: DigestEntry[] | undefined;
  isLoading: boolean;
  renderActions?: (entry: DigestEntry) => ReactNode;
}) {
  if (isLoading) return <LoadingSpinner />;
  if (!entries || entries.length === 0) return null;

  return (
    <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} actions={renderActions?.(entry)} />
      ))}
    </div>
  );
}
