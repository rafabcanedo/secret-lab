import type { categories } from "../db/schema/categories.js"

export type CategoryRecord = typeof categories.$inferSelect
