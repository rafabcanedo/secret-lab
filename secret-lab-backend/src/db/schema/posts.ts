import { pgTable, pgEnum, uuid, varchar, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { communities } from "./communities.js";
import { tags } from "./tags.js";

export const postStatusEnum = pgEnum("post_status", ["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const posts = pgTable("posts", {
  id:              uuid().primaryKey().defaultRandom(),
  community_id:    uuid().notNull().references(() => communities.id),
  author_id:       uuid().notNull().references(() => users.id),
  slug:            varchar({ length: 255 }).unique(),
  title:           varchar({ length: 200 }).notNull(),
  cover_image_url: varchar({ length: 255 }),
  content:         text().notNull(),
  status:          postStatusEnum().notNull().default("DRAFT"),
  published_at:    timestamp({ withTimezone: true }),
  created_at:      timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at:      timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const postTags = pgTable("post_tags", {
  post_id: uuid().notNull().references(() => posts.id),
  tag_id:  uuid().notNull().references(() => tags.id),
}, (t) => [primaryKey({ columns: [t.post_id, t.tag_id] })]);
