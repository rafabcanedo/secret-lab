import type { tags } from "../db/schema/tags.js"

export type TagRecord = typeof tags.$inferSelect
