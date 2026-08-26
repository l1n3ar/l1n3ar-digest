"use client";

import { useEffect, useRef, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRuns } from "@/ui/hooks/use-runs";
import { generateAction } from "@/engine/actions/admin";
import { Button } from "@/ui/components/ui/button";
import { RunsList } from "@/ui/components/admin/runs-list";

export function RunsPanel() {
  const { data: runs, isLoading } = useRuns();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const prevStatusRef = useRef<string | undefined>(undefined);

  const latestStatus = runs?.[0]?.status;
  const isRunning = latestStatus === "running";
  const isButtonLoading = isPending || isRunning;

  useEffect(() => {
    if (prevStatusRef.current === "running" && (latestStatus === "done" || latestStatus === "error")) {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
    prevStatusRef.current = latestStatus;
  }, [latestStatus, queryClient]);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="button"
          size="xs"
          variant="outline"
          disabled={isButtonLoading}
          onClick={() =>
            startTransition(async () => {
              await generateAction();
              queryClient.invalidateQueries({ queryKey: ["runs"] });
            })
          }
        >
          {isButtonLoading && <Loader2 className="animate-spin" />}
          Run
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        ) : (
          <RunsList runs={runs ?? []} />
        )}
      </div>
    </div>
  );
}
