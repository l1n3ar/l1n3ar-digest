"use client";

import { EntryList } from "@/ui/components/entry-list";
import { useFeed } from "@/ui/hooks/use-feed";

export default function Home() {
  const { data: entries, isLoading } = useFeed();

  return (
    <main className="flex flex-1 justify-center">
      <div className="w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <EntryList entries={entries} isLoading={isLoading} />
      </div>
    </main>
  );
}
