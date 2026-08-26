"use client";

import { useState } from "react";
import { DraftsList } from "@/ui/components/admin/drafts-list";
import { PublishedList } from "@/ui/components/admin/published-list";
import { RunsPanel } from "@/ui/components/admin/runs-panel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/components/ui/tabs";
import { Button } from "@/ui/components/ui/button";
import { useRuns } from "@/ui/hooks/use-runs";
import { useGenerateRun } from "@/ui/hooks/use-generate-run";

export default function AdminPage() {
  const [tab, setTab] = useState("drafts");
  const { data: runs } = useRuns();
  const { trigger, isPending } = useGenerateRun();

  const isRunning = runs?.[0]?.status === "running";
  const isButtonLoading = isPending || isRunning;

  return (
    <main className="flex h-full flex-1 justify-center overflow-hidden">
      <div className="flex h-full w-full max-w-5xl flex-col px-5 py-10 sm:px-8 lg:px-10">
        <Tabs value={tab} onValueChange={setTab} className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between">
            <TabsList>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="runs">Runs</TabsTrigger>
            </TabsList>

            {tab === "runs" && (
              <Button type="button" size="xs" loading={isButtonLoading} onClick={trigger}>
                Generate
              </Button>
            )}
          </div>

          <TabsContent value="drafts" className="mt-6 min-h-0 flex-1 overflow-y-auto">
            <DraftsList />
          </TabsContent>

          <TabsContent value="published" className="mt-6 min-h-0 flex-1 overflow-y-auto">
            <PublishedList />
          </TabsContent>

          <TabsContent value="runs" className="mt-6 min-h-0 flex-1 overflow-y-auto">
            <RunsPanel onViewDrafts={() => setTab("drafts")} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
