import type { users } from "../db/schema/users.js"

export type UserRecord = typeof users.$inferSelect
export type UserPublic = Omit<UserRecord, "password_hash">
export type UserUpdatePayload = Partial<Omit<UserRecord, "id" | "created_at">>
