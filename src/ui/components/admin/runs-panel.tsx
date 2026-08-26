"use client";

import { RunsList } from "@/ui/components/admin/runs-list";
import { LoadingSpinner } from "@/ui/components/loading-spinner";
import { useInvalidateContent } from "@/ui/hooks/use-invalidate-content";
import { useRuns } from "@/ui/hooks/use-runs";
import { useEffect, useRef } from "react";

export function RunsPanel({ onViewDrafts }: { onViewDrafts: () => void }) {
  const { data: runs, isLoading } = useRuns();
  const invalidate = useInvalidateContent();
  const prevStatusRef = useRef<string | undefined>(undefined);

  const latestStatus = runs?.[0]?.status;

  useEffect(() => {
    if (prevStatusRef.current === "running" && (latestStatus === "done" || latestStatus === "error")) {
      invalidate();
    }
    prevStatusRef.current = latestStatus;
  }, [latestStatus, invalidate]);

  if (isLoading) return <LoadingSpinner />;

  return <RunsList runs={runs ?? []} onViewDrafts={onViewDrafts} />;
}
