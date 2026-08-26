"use client";

import { deleteAction, unpublishAction } from "@/engine/actions/admin";
import { ConfirmActionButton } from "@/ui/components/admin/confirm-action-button";
import { EntryList } from "@/ui/components/entry-list";
import { useFeed } from "@/ui/hooks/use-feed";
import { useInvalidateContent } from "@/ui/hooks/use-invalidate-content";

export function PublishedList() {
  const { data: entries, isLoading } = useFeed();
  const invalidate = useInvalidateContent();

  return (
    <EntryList
      entries={entries}
      isLoading={isLoading}
      renderActions={(entry) => (
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
      )}
    />
  );
}
