import type { RunLogEntry } from "@/engine/types/generation-run";
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const generationRuns = pgTable("generation_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  status: text("status", { enum: ["running", "done", "error"] })
    .notNull()
    .default("running"),
  trigger: text("trigger", { enum: ["manual", "cron"] })
    .notNull()
    .default("manual"),
  deepRead: boolean("deep_read").notNull().default(false),
  log: jsonb("log").notNull().default([]).$type<RunLogEntry[]>(),
  draftsCreated: integer("drafts_created").notNull().default(0),
  model: text("model"),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
  webSearchRequests: integer("web_search_requests").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
});
