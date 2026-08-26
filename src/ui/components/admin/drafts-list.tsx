"use client";

import { deleteAction, publishAction } from "@/engine/actions/admin";
import { ConfirmActionButton } from "@/ui/components/admin/confirm-action-button";
import { EntryList } from "@/ui/components/entry-list";
import { useDrafts } from "@/ui/hooks/use-drafts";
import { useInvalidateContent } from "@/ui/hooks/use-invalidate-content";

export function DraftsList() {
  const { data: drafts, isLoading } = useDrafts();
  const invalidate = useInvalidateContent();

  return (
    <EntryList
      entries={drafts}
      isLoading={isLoading}
      renderActions={(entry) => (
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
      )}
    />
  );
}
