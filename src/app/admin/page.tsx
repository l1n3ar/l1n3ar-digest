"use client";

import { useState } from "react";
import { DraftsList } from "@/ui/components/admin/drafts-list";
import { RunsPanel } from "@/ui/components/admin/runs-panel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/components/ui/tabs";

export default function AdminPage() {
  const [tab, setTab] = useState("drafts");

  return (
    <main className="flex h-full flex-1 justify-center overflow-hidden">
      <div className="flex h-full w-full max-w-5xl flex-col px-5 py-10 sm:px-8 lg:px-10">
        <Tabs value={tab} onValueChange={setTab} className="flex h-full flex-col">
          <TabsList className="shrink-0">
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="runs">Runs</TabsTrigger>
          </TabsList>

          <TabsContent value="drafts" className="mt-6 min-h-0 flex-1 overflow-y-auto">
            <DraftsList />
          </TabsContent>

          <TabsContent value="runs" className="mt-6 min-h-0 flex-1 overflow-y-auto">
            <RunsPanel onViewDrafts={() => setTab("drafts")} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
