import { pgTable, pgEnum, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { posts } from "./posts.js";
import { comments } from "./comments.js";

export const notificationTypeEnum = pgEnum("notification_type", ["LIKE", "COMMENT", "REPLY"]);

export const notifications = pgTable("notifications", {
  id:         uuid().primaryKey().defaultRandom(),
  user_id:    uuid().notNull().references(() => users.id),
  actor_id:   uuid().notNull().references(() => users.id),
  type:       notificationTypeEnum().notNull(),
  post_id:    uuid().references(() => posts.id),
  comment_id: uuid().references(() => comments.id),
  read_at:    timestamp({ withTimezone: true }),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
