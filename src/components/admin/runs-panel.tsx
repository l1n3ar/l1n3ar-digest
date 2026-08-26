"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import type { GenerationRun } from "@/types/generation-run";
import { generateAction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { RunsList } from "@/components/admin/runs-list";

export function RunsPanel({ initialRuns }: { initialRuns: GenerationRun[] }) {
  const [runs, setRuns] = useState(initialRuns);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setRuns(initialRuns);
  }, [initialRuns]);

  const isRunning = runs[0]?.status === "running";
  const isLoading = isPending || isRunning;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(async () => {
      const res = await fetch("/api/admin/runs");
      const data = await res.json();
      setRuns(data.runs);
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <Button
        type="button"
        size="xs"
        variant="outline"
        disabled={isLoading}
        onClick={() => startTransition(async () => { await generateAction(); })}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        Run
      </Button>

      <div className="mt-4">
        <RunsList runs={runs} />
      </div>
    </div>
  );
}
