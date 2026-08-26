import { pgTable, uuid, text, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const digestEntries = pgTable('digest_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  topic: text('topic').notNull(),
  links: jsonb('links').notNull().default([]),
  buildIdea: text('build_idea'),
  status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
});
