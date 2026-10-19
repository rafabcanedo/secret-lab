import { and, eq, inArray, sql } from "drizzle-orm"
import { db } from "../db/index.js"
import { communities, communityMembers, communityCategories } from "../db/schema/communities.js"
import { categories } from "../db/schema/categories.js"
import type { CommunityRecord, CommunityPublic, CategoryPublic } from "../types/communities.js"

export const communityRepository = {
  async create(data: typeof communities.$inferInsert): Promise<CommunityRecord> {
    const [row] = await db.insert(communities).values(data).returning()
    if (!row) throw new Error("Insert returned no rows")
    return row
  },

  async findById(id: string): Promise<CommunityRecord | undefined> {
    const [row] = await db.select().from(communities).where(eq(communities.id, id)).limit(1)
    return row
  },

  async findBySlug(slug: string): Promise<CommunityPublic | undefined> {
    const [row] = await db.select().from(communities).where(eq(communities.slug, slug)).limit(1)
    if (!row) return undefined

    const catRows = await db
      .select({ id: categories.id, name: categories.name, slug: categories.slug })
      .from(communityCategories)
      .innerJoin(categories, eq(communityCategories.category_id, categories.id))
      .where(eq(communityCategories.community_id, row.id))

    const [countRow] = await db
      .select({ count: sql<string>`cast(count(*) as text)` })
      .from(communityMembers)
      .where(eq(communityMembers.community_id, row.id))

    return {
      ...row,
      categories: catRows,
      member_count: Number(countRow?.count ?? 0),
    }
  },

  async findAll(): Promise<CommunityPublic[]> {
    const rows = await db.select().from(communities).orderBy(communities.created_at)
    if (rows.length === 0) return []

    const ids = rows.map(r => r.id)

    const catRows = await db
      .select({
        community_id: communityCategories.community_id,
        id:           categories.id,
        name:         categories.name,
        slug:         categories.slug,
      })
      .from(communityCategories)
      .innerJoin(categories, eq(communityCategories.category_id, categories.id))
      .where(inArray(communityCategories.community_id, ids))

    const countRows = await db
      .select({
        community_id: communityMembers.community_id,
        count:        sql<string>`cast(count(*) as text)`,
      })
      .from(communityMembers)
      .where(inArray(communityMembers.community_id, ids))
      .groupBy(communityMembers.community_id)

    const catMap = new Map<string, CategoryPublic[]>()
    for (const row of catRows) {
      const list = catMap.get(row.community_id) ?? []
      list.push({ id: row.id, name: row.name, slug: row.slug })
      catMap.set(row.community_id, list)
    }

    const countMap = new Map<string, number>()
    for (const row of countRows) {
      countMap.set(row.community_id, Number(row.count))
    }

    return rows.map(r => ({
      ...r,
      categories:   catMap.get(r.id) ?? [],
      member_count: countMap.get(r.id) ?? 0,
    }))
  },

  async existsBySlug(slug: string): Promise<boolean> {
    const [row] = await db.select({ id: communities.id }).from(communities).where(eq(communities.slug, slug)).limit(1)
    return !!row
  },

  async addCategories(communityId: string, categoryIds: string[]): Promise<void> {
    if (categoryIds.length === 0) return
    await db.insert(communityCategories).values(
      categoryIds.map(category_id => ({ community_id: communityId, category_id }))
    )
  },

  async addMember(communityId: string, userId: string): Promise<void> {
    await db.insert(communityMembers).values({ community_id: communityId, user_id: userId })
  },

  async findMember(communityId: string, userId: string): Promise<boolean> {
    const [row] = await db
      .select({ community_id: communityMembers.community_id })
      .from(communityMembers)
      .where(and(eq(communityMembers.community_id, communityId), eq(communityMembers.user_id, userId)))
      .limit(1)
    return !!row
  },

  async removeMember(communityId: string, userId: string): Promise<void> {
    await db
      .delete(communityMembers)
      .where(and(eq(communityMembers.community_id, communityId), eq(communityMembers.user_id, userId)))
  },
}
