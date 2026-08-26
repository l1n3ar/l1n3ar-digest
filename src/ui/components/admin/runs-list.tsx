"use client";

import { Clock, CheckCircle2, XCircle } from "lucide-react";
import type { GenerationRun } from "@/engine/types/generation-run";
import { Muted } from "@/ui/components/ui/typography";
import { formatDate } from "@/ui/utils/format-date";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/ui/components/ui/accordion";
import { cn } from "@/ui/lib/utils";

function StatusIcon({ status }: { status: GenerationRun["status"] }) {
  if (status === "running") return <Clock className="size-3.5 text-amber-500" />;
  if (status === "done") return <CheckCircle2 className="size-3.5 text-green-500" />;
  return <XCircle className="size-3.5 text-red-500" />;
}

function MetaRow({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <tr onClick={onClick} className={onClick ? "hover:cursor-pointer" : undefined}>
      <td className="py-1 pr-3 text-[10px] tracking-wide text-muted-foreground/70 uppercase">{label}</td>
      <td className={cn("py-1 text-xs font-medium text-foreground", onClick && "hover:underline")}>{children}</td>
    </tr>
  );
}

function RunItem({ run, onViewDrafts }: { run: GenerationRun; onViewDrafts: () => void }) {
  return (
    <AccordionItem value={run.id} className='border-b'>
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <StatusIcon status={run.status} />
          <span className="text-xs font-medium">#{run.id.slice(0, 8)}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="col-span-1 flex max-h-64 flex-col overflow-y-auto sm:col-span-2">
            {run.log.map((entry, i) => (
              <Muted key={i} className="leading-snug">
                {entry.message}
              </Muted>
            ))}
          </div>

          <div className="col-span-1 border-t border-border pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
            <table className="w-full">
              <tbody>
                <MetaRow label="Trigger">{run.trigger === "cron" ? "Cron" : "Manual"}</MetaRow>
                <MetaRow label="Created">{formatDate(run.createdAt)}</MetaRow>
                <MetaRow label="Model">{run.model ?? "—"}</MetaRow>
                <MetaRow label="Deep read">{run.deepRead ? "Yes" : "No"}</MetaRow>

                {run.status !== "running" && (
                  <>
                    <MetaRow label="Drafts" onClick={onViewDrafts}>
                      {run.draftsCreated}
                    </MetaRow>
                    <MetaRow label="Searches">{run.webSearchRequests}</MetaRow>
                    <MetaRow label="Tokens">
                      {run.inputTokens} in / {run.outputTokens} out
                    </MetaRow>
                  </>
                )}
              </tbody>
            </table>
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
