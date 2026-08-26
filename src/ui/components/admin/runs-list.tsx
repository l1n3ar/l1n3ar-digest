"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import type { GenerationRun } from "@/engine/types/generation-run";
import { Muted } from "@/ui/components/ui/typography";
import { formatDate } from "@/ui/utils/format-date";

function StatusIcon({ status }: { status: GenerationRun["status"] }) {
  if (status === "running") return <Clock className="size-3.5 text-amber-500" />;
  if (status === "done") return <CheckCircle2 className="size-3.5 text-green-500" />;
  return <XCircle className="size-3.5 text-red-500" />;
}

function statusLabel(status: GenerationRun["status"]) {
  if (status === "running") return "Running…";
  if (status === "done") return "Done";
  return "Error";
}

function RunItem({ run, forceOpen }: { run: GenerationRun; forceOpen: boolean }) {
  const [open, setOpen] = useState(forceOpen);

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  return (
    <details
      open={forceOpen || open}
      onToggle={(e) => {
        if (!forceOpen) setOpen(e.currentTarget.open);
      }}
      className="group border-b border-border pb-4"
    >
      <summary className="flex list-none cursor-pointer items-center gap-2 [&::-webkit-details-marker]:hidden">
        <StatusIcon status={run.status} />
        <span className="text-xs font-medium">{statusLabel(run.status)}</span>
        <Muted>{run.trigger}</Muted>
      </summary>

      <div className="mt-3 grid grid-cols-4 gap-4">
        <div className="col-span-3 flex max-h-64 flex-col gap-1 overflow-y-auto">
          {run.log.map((entry, i) => (
            <Muted key={i}>{entry.message}</Muted>
          ))}
        </div>

        <div className="col-span-1 flex flex-col gap-1 border-l border-border pl-4">
          <Muted>{run.model ?? "—"}</Muted>
          <time dateTime={run.createdAt}>
            <Muted>{formatDate(run.createdAt)}</Muted>
          </time>
          {run.status !== "running" && (
            <>
              <Muted>{run.draftsCreated} draft(s)</Muted>
              <Muted>
                {run.inputTokens} in / {run.outputTokens} out
              </Muted>
              <Muted>{run.webSearchRequests} searches</Muted>
            </>
          )}
        </div>
      </div>
    </details>
  );
}

export function RunsList({ runs }: { runs: GenerationRun[] }) {
  return (
    <div className="flex flex-col gap-4">
      {runs.map((run, i) => (
        <RunItem key={run.id} run={run} forceOpen={i === 0 && run.status === "running"} />
      ))}
    </div>
  );
}
