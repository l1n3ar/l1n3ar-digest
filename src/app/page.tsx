import { getEntries } from "@/lib/digest";
import { EntryCard } from "@/components/entry-card";
import { Muted } from "@/components/ui/typography";

export const dynamic = "force-dynamic";

export default async function Home() {
  const entries = await getEntries();

  return (
    <main className="flex flex-1 justify-center">
      <div className="w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        {entries.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <Muted>No entries yet.</Muted>
        )}
      </div>
    </main>
  );
}
