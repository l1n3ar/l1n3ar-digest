"use server";

import { GENERATION_DEEP_READ_ENABLED } from "@/engine/config/feature-flags";
import { deleteEntry, generateDrafts, publishEntry, unpublishEntry } from "@/engine/lib/digest";
import { createRun } from "@/engine/lib/generation-runs";
import { after } from "next/server";

export async function publishAction(id: string) {
  await publishEntry(id);
}

export async function unpublishAction(id: string) {
  await unpublishEntry(id);
}

export async function deleteAction(id: string) {
  await deleteEntry(id);
}

export async function generateAction(deepRead: boolean) {
  const effectiveDeepRead = GENERATION_DEEP_READ_ENABLED && deepRead;
  const run = await createRun("manual", effectiveDeepRead);
  after(() => generateDrafts(run.id, effectiveDeepRead));
}
