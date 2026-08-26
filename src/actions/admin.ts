'use server';

import { after } from 'next/server';
import { revalidatePath } from 'next/cache';
import { publishEntry, deleteEntry, generateDrafts } from '@/lib/digest';
import { createRun } from '@/lib/generation-runs';

export async function publishAction(id: string) {
  await publishEntry(id);
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function deleteAction(id: string) {
  await deleteEntry(id);
  revalidatePath('/admin');
}

export async function generateAction() {
  const run = await createRun();
  after(() => generateDrafts(run.id));
  revalidatePath('/admin');
}
