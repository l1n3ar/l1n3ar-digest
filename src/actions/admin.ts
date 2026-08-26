'use server';

import { revalidatePath } from 'next/cache';
import { publishEntry, deleteEntry, generateDrafts } from '@/lib/digest';

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
  await generateDrafts();
  revalidatePath('/admin');
}
