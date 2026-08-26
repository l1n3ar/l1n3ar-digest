import { eq, desc } from 'drizzle-orm';
import { db } from './db';
import { generationRuns } from '@/engine/schemas/db/generation-run';
import type { GenerationRun } from '@/engine/types/generation-run';

export async function createRun(trigger: 'manual' | 'cron', deepRead: boolean): Promise<GenerationRun> {
  const [row] = await db.insert(generationRuns).values({ trigger, deepRead }).returning();
  return row;
}

export async function appendRunLog(id: string, message: string): Promise<void> {
  const [run] = await db.select({ log: generationRuns.log }).from(generationRuns).where(eq(generationRuns.id, id));
  if (!run) return;

  const log = [...run.log, { message, at: new Date().toISOString() }];
  await db.update(generationRuns).set({ log }).where(eq(generationRuns.id, id));
}

export async function finishRun(
  id: string,
  status: 'done' | 'error',
  stats: {
    draftsCreated: number;
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    webSearchRequests?: number;
  }
): Promise<void> {
  await db
    .update(generationRuns)
    .set({ status, finishedAt: new Date().toISOString(), ...stats })
    .where(eq(generationRuns.id, id));
}

export async function listRuns(): Promise<GenerationRun[]> {
  return db.select().from(generationRuns).orderBy(desc(generationRuns.createdAt)).limit(20);
}

export async function getLatestRun(): Promise<GenerationRun | undefined> {
  const [row] = await db.select().from(generationRuns).orderBy(desc(generationRuns.createdAt)).limit(1);
  return row;
}
