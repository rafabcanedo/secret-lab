import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { posts } from "./posts.js";

export const comments = pgTable("comments", {
  id:         uuid().primaryKey().defaultRandom(),
  post_id:    uuid().notNull().references(() => posts.id, { onDelete: "cascade" }),
  author_id:  uuid().notNull().references(() => users.id),
  parent_id:  uuid().references((): AnyPgColumn => comments.id, { onDelete: "cascade" }),
  content:    text().notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
