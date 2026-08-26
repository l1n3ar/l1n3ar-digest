"use client";

import type { GenerationRun } from "@/types/generation-run";
import { H3, Muted } from "@/components/ui/typography";
import { formatDate } from "@/utils/format-date";

function formatCost(cost: number | null) {
  if (cost === null) return "—";
  return `$${cost.toFixed(4)}`;
}

function RunItem({ run }: { run: GenerationRun }) {
  const label = run.status === "running" ? "Running…" : run.status === "done" ? "Done" : "Error";

  return (
    <details className="group border-b border-border pb-4">
      <summary className="flex list-none flex-col gap-2 cursor-pointer [&::-webkit-details-marker]:hidden">
        <H3>{label}</H3>

        <Muted className="flex flex-wrap items-center gap-2">
          <span>{run.model ?? "—"}</span>
          <span>·</span>
          <time dateTime={run.createdAt}>{formatDate(run.createdAt)}</time>
          {run.status !== "running" && (
            <>
              <span>·</span>
              <span>{run.draftsCreated} draft(s)</span>
              <span>·</span>
              <span>{formatCost(run.estimatedCostUsd)}</span>
            </>
          )}
        </Muted>
      </summary>

      <div className="mt-3 flex flex-col gap-2">
        {run.status !== "running" && (
          <Muted className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              {run.inputTokens} in / {run.outputTokens} out tokens
            </span>
            <span>{run.webSearchRequests} searches</span>
          </Muted>
        )}

        {run.log.length > 0 && (
          <div className="flex max-h-64 flex-col gap-1 overflow-y-auto">
            {run.log.map((entry, i) => (
              <Muted key={i}>{entry.message}</Muted>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

export function RunsList({ runs }: { runs: GenerationRun[] }) {
  return (
    <div className="flex flex-col gap-4">
      {runs.map((run) => (
        <RunItem key={run.id} run={run} />
      ))}
    </div>
  );
}
