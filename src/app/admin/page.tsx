import { listDrafts } from "@/lib/digest";
import { publishAction, deleteAction, generateAction } from "@/actions/admin";
import { EntryCard } from "@/components/entry-card";
import { Button } from "@/components/ui/button";
import { H1, Muted } from "@/components/ui/typography";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const drafts = await listDrafts();

  return (
    <main className="flex flex-1 justify-center">
      <div className="w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <H1>Drafts</H1>
          <form action={generateAction}>
            <Button type="submit" size="xs" variant="outline">
              Run
            </Button>
          </form>
        </div>

        {drafts.length === 0 ? (
          <Muted className="mt-6">No drafts.</Muted>
        ) : (
          <div className="mt-6 grid grid-cols-1 items-start gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                actions={
                  <>
                    <form action={publishAction.bind(null, entry.id)}>
                      <Button type="submit" size="xs">
                        Publish
                      </Button>
                    </form>
                    <form action={deleteAction.bind(null, entry.id)}>
                      <Button type="submit" size="xs" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </>
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
