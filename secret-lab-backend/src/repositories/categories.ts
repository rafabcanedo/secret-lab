import { eq, inArray } from "drizzle-orm"
import { db } from "../db/index.js"
import { categories } from "../db/schema/categories.js"
import type { CategoryRecord } from "../types/categories.js"

export const categoryRepository = {
  async create(data: typeof categories.$inferInsert): Promise<CategoryRecord> {
    const [row] = await db.insert(categories).values(data).returning()
    if (!row) throw new Error("Insert returned no rows")
    return row
  },

  async findBySlug(slug: string): Promise<CategoryRecord | undefined> {
    const [row] = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1)
    return row
  },

  async findAll(): Promise<CategoryRecord[]> {
    return db.select().from(categories).orderBy(categories.name)
  },

  async findAllByIds(ids: string[]): Promise<CategoryRecord[]> {
    return db.select().from(categories).where(inArray(categories.id, ids))
  },
}
