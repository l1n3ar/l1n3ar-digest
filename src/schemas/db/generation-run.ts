import { pgTable, uuid, text, jsonb, integer, doublePrecision, timestamp } from 'drizzle-orm/pg-core';
import type { RunLogEntry } from '@/types/generation-run';

export const generationRuns = pgTable('generation_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  status: text('status', { enum: ['running', 'done', 'error'] }).notNull().default('running'),
  log: jsonb('log').notNull().default([]).$type<RunLogEntry[]>(),
  draftsCreated: integer('drafts_created').notNull().default(0),
  model: text('model'),
  inputTokens: integer('input_tokens').notNull().default(0),
  outputTokens: integer('output_tokens').notNull().default(0),
  webSearchRequests: integer('web_search_requests').notNull().default(0),
  estimatedCostUsd: doublePrecision('estimated_cost_usd'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
});
