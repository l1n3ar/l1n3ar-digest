"use client";

import { Clock, CheckCircle2, XCircle } from "lucide-react";
import type { GenerationRun } from "@/engine/types/generation-run";
import { Muted } from "@/ui/components/ui/typography";
import { formatDate } from "@/ui/utils/format-date";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/ui/components/ui/accordion";

function StatusIcon({ status }: { status: GenerationRun["status"] }) {
  if (status === "running") return <Clock className="size-3.5 text-amber-500" />;
  if (status === "done") return <CheckCircle2 className="size-3.5 text-green-500" />;
  return <XCircle className="size-3.5 text-red-500" />;
}

function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] tracking-wide text-muted-foreground/70 uppercase">{label}</span>
      <span className="text-xs font-medium text-foreground">{children}</span>
    </div>
  );
}

function RunItem({ run, onViewDrafts }: { run: GenerationRun; onViewDrafts: () => void }) {
  return (
    <AccordionItem value={run.id}>
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <StatusIcon status={run.status} />
          <span className="text-xs font-medium">#{run.id.slice(0, 8)}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="col-span-1 flex max-h-64 flex-col gap-1 overflow-y-auto sm:col-span-2">
            {run.log.map((entry, i) => (
              <Muted key={i}>{entry.message}</Muted>
            ))}
          </div>

          <div className="col-span-1 flex flex-col gap-3 border-t border-border pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
            <MetaField label="Trigger">{run.trigger === "cron" ? "Cron" : "Manual"}</MetaField>
            <MetaField label="Model">{run.model ?? "—"}</MetaField>
            <MetaField label="Created">{formatDate(run.createdAt)}</MetaField>

            {run.status !== "running" && (
              <>
                <button type="button" onClick={onViewDrafts} className="text-left hover:cursor-pointer">
                  <MetaField label="Drafts">{run.draftsCreated}</MetaField>
                </button>
                <MetaField label="Tokens">
                  {run.inputTokens} in / {run.outputTokens} out
                </MetaField>
                <MetaField label="Searches">{run.webSearchRequests}</MetaField>
              </>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function RunsList({ runs, onViewDrafts }: { runs: GenerationRun[]; onViewDrafts: () => void }) {
  return (
    <Accordion defaultValue={runs[0] ? [runs[0].id] : []}>
      {runs.map((run) => (
        <RunItem key={run.id} run={run} onViewDrafts={onViewDrafts} />
      ))}
    </Accordion>
  );
}
