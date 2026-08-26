'use server';

import { after } from 'next/server';
import { publishEntry, unpublishEntry, deleteEntry, generateDrafts } from '@/engine/lib/digest';
import { createRun } from '@/engine/lib/generation-runs';

export async function publishAction(id: string) {
  await publishEntry(id);
}

export async function unpublishAction(id: string) {
  await unpublishEntry(id);
}

export async function deleteAction(id: string) {
  await deleteEntry(id);
}

export async function generateAction() {
  const run = await createRun('manual');
  after(() => generateDrafts(run.id));
}
