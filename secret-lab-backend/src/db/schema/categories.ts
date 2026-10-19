import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id:         uuid().primaryKey().defaultRandom(),
  name:       varchar({ length: 100 }).notNull().unique(),
  slug:       varchar({ length: 100 }).notNull().unique(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
