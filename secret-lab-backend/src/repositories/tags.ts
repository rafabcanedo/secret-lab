import { eq, inArray } from "drizzle-orm"
import { db } from "../db/index.js"
import { tags } from "../db/schema/tags.js"
import type { TagRecord } from "../types/tags.js"

export const tagRepository = {
  async create(data: typeof tags.$inferInsert): Promise<TagRecord> {
    const [row] = await db.insert(tags).values(data).returning()
    if (!row) throw new Error("Insert returned no rows")
    return row
  },

  async findBySlug(slug: string): Promise<TagRecord | undefined> {
    const [row] = await db.select().from(tags).where(eq(tags.slug, slug)).limit(1)
    return row
  },

  async findAll(): Promise<TagRecord[]> {
    return db.select().from(tags).orderBy(tags.name)
  },

  async findAllByIds(ids: string[]): Promise<TagRecord[]> {
    return db.select().from(tags).where(inArray(tags.id, ids))
  },
}
