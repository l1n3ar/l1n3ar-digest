import { listDrafts } from "@/lib/digest";
import { listRuns } from "@/lib/generation-runs";
import { publishAction, deleteAction, generateAction } from "@/actions/admin";
import { EntryCard } from "@/components/entry-card";
import { ConfirmActionButton } from "@/components/admin/confirm-action-button";
import { RunsList } from "@/components/admin/runs-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [drafts, runs] = await Promise.all([listDrafts(), listRuns()]);

  return (
    <main className="flex flex-1 justify-center">
      <div className="w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <Tabs defaultValue="drafts">
          <TabsList>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="runs">Runs</TabsTrigger>
          </TabsList>

          <TabsContent value="drafts">
            {drafts.length > 0 && (
              <div className="mt-6 grid grid-cols-1 items-start gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                {drafts.map((entry) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    actions={
                      <>
                        <ConfirmActionButton
                          label="Publish"
                          title="Publish this entry?"
                          description="It will appear on the public feed immediately."
                          action={publishAction.bind(null, entry.id)}
                        />
                        <ConfirmActionButton
                          label="Delete"
                          title="Delete this draft?"
                          description="This can't be undone."
                          action={deleteAction.bind(null, entry.id)}
                          variant="destructive"
                        />
                      </>
                    }
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="runs">
            <form action={generateAction} className="mt-6">
              <Button type="submit" size="xs" variant="outline">
                Run
              </Button>
            </form>

            <div className="mt-4">
              <RunsList initialRuns={runs} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
