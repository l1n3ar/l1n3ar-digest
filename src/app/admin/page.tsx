import { DraftsList } from "@/ui/components/admin/drafts-list";
import { RunsPanel } from "@/ui/components/admin/runs-panel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/components/ui/tabs";

export default function AdminPage() {
  return (
    <main className="flex flex-1 justify-center">
      <div className="w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <Tabs defaultValue="drafts">
          <TabsList>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="runs">Runs</TabsTrigger>
          </TabsList>

          <TabsContent value="drafts" className="mt-6">
            <DraftsList />
          </TabsContent>

          <TabsContent value="runs" className="mt-6">
            <RunsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
