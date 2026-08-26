"use client";

import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useDrafts } from "@/ui/hooks/use-drafts";
import { publishAction, deleteAction } from "@/engine/actions/admin";
import { EntryCard } from "@/ui/components/entry-card";
import { ConfirmActionButton } from "@/ui/components/admin/confirm-action-button";

export function DraftsList() {
  const { data: drafts, isLoading } = useDrafts();
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["drafts"] });
    queryClient.invalidateQueries({ queryKey: ["feed"] });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!drafts || drafts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {drafts.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          actions={
            <>
              <ConfirmActionButton
                label="Publish"
                title="Publish this entry?"
                description="It will appear on the public feed immediately."
                action={async () => {
                  await publishAction(entry.id);
                  invalidate();
                }}
              />
              <ConfirmActionButton
                label="Delete"
                title="Delete this draft?"
                description="This can't be undone."
                action={async () => {
                  await deleteAction(entry.id);
                  invalidate();
                }}
                variant="destructive"
              />
            </>
          }
        />
      ))}
    </div>
  );
}
