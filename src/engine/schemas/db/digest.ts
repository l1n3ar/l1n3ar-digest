import type { DigestLink } from "@/engine/types/digest";
import { sql } from "drizzle-orm";
import { check, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const digestEntries = pgTable(
  "digest_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    topic: text("topic").notNull(),
    links: jsonb("links").notNull().default([]).$type<DigestLink[]>(),
    buildIdea: text("build_idea"),
    status: text("status", { enum: ["draft", "published"] })
      .notNull()
      .default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
    publishedAt: timestamp("published_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [check("digest_entries_status_check", sql`${table.status} IN ('draft', 'published')`)],
);
