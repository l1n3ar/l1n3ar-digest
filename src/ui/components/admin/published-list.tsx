"use client";

import { deleteAction, unpublishAction } from "@/engine/actions/admin";
import { ConfirmActionButton } from "@/ui/components/admin/confirm-action-button";
import { EntryCard } from "@/ui/components/entry-card";
import { useFeed } from "@/ui/hooks/use-feed";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export function PublishedList() {
  const { data: entries, isLoading } = useFeed();
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

  if (!entries || entries.length === 0) return null;

  return (
    <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          actions={
            <>
              <ConfirmActionButton
                label="Unpublish"
                title="Unpublish this entry?"
                description="It moves back to drafts and comes off the public feed immediately."
                action={async () => {
                  await unpublishAction(entry.id);
                  invalidate();
                }}
                variant="outline"
              />
              <ConfirmActionButton
                label="Delete"
                title="Delete this entry?"
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
