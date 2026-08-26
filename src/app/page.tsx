"use client";

import { Loader2 } from "lucide-react";
import { useFeed } from "@/ui/hooks/use-feed";
import { EntryCard } from "@/ui/components/entry-card";

export default function Home() {
  const { data: entries, isLoading } = useFeed();

  return (
    <main className="flex flex-1 justify-center">
      <div className="w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        ) : entries && entries.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
