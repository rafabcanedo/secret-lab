import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { posts } from "./posts.js";

export const likes = pgTable("likes", {
  user_id: uuid().notNull().references(() => users.id),
  post_id: uuid().notNull().references(() => posts.id, { onDelete: "cascade" }),
}, (t) => [primaryKey({ columns: [t.user_id, t.post_id] })]);
