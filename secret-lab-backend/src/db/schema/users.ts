import { pgTable, pgEnum, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const userSpecialtyEnum = pgEnum("user_specialty", [
  "RADIOLOGIA",
  "PEDIATRIA",
  "DERMATOLOGIA",
]);

export const users = pgTable("users", {
  id:            uuid().primaryKey().defaultRandom(),
  name:          varchar({ length: 100 }).notNull(),
  crm:           varchar({ length: 12 }).notNull().unique(),
  slug:          varchar({ length: 100 }).notNull().unique(),
  specialty:     userSpecialtyEnum().notNull(),
  email:         varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  created_at:    timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at:    timestamp({ withTimezone: true }).notNull().defaultNow(),
});
