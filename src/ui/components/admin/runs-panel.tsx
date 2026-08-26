"use client";

import { RunsList } from "@/ui/components/admin/runs-list";
import { useRuns } from "@/ui/hooks/use-runs";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

export function RunsPanel({ onViewDrafts }: { onViewDrafts: () => void }) {
  const { data: runs, isLoading } = useRuns();
  const queryClient = useQueryClient();
  const prevStatusRef = useRef<string | undefined>(undefined);

  const latestStatus = runs?.[0]?.status;

  useEffect(() => {
    if (prevStatusRef.current === "running" && (latestStatus === "done" || latestStatus === "error")) {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
    prevStatusRef.current = latestStatus;
  }, [latestStatus, queryClient]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <RunsList runs={runs ?? []} onViewDrafts={onViewDrafts} />;
}
