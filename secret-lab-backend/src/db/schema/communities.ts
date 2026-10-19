import { pgTable, uuid, varchar, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { categories } from "./categories.js";

export const communities = pgTable("communities", {
  id:          uuid().primaryKey().defaultRandom(),
  creator_id:  uuid().notNull().references(() => users.id),
  name:        varchar({ length: 100 }).notNull(),
  slug:        varchar({ length: 100 }).notNull().unique(),
  description: text(),
  created_at:  timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at:  timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const communityMembers = pgTable("community_members", {
  community_id: uuid().notNull().references(() => communities.id, { onDelete: "cascade" }),
  user_id:      uuid().notNull().references(() => users.id),
  created_at:   timestamp({ withTimezone: true }).notNull().defaultNow(),
}, (t) => [primaryKey({ columns: [t.community_id, t.user_id] })]);

export const communityCategories = pgTable("community_categories", {
  community_id: uuid().notNull().references(() => communities.id, { onDelete: "cascade" }),
  category_id:  uuid().notNull().references(() => categories.id),
}, (t) => [primaryKey({ columns: [t.community_id, t.category_id] })]);
