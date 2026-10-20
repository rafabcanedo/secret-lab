import { and, desc, eq, inArray, sql } from "drizzle-orm"
import { db } from "../db/index.js"
import { posts, postTags } from "../db/schema/posts.js"
import { users } from "../db/schema/users.js"
import { communities } from "../db/schema/communities.js"
import { tags } from "../db/schema/tags.js"
import { likes } from "../db/schema/likes.js"
import type { PostRecord, PostPublic, PostFeedItem, TagPublic, FeedFilters, FeedSort, Pagination } from "../types/posts.js"

function buildLikesSubquery() {
  return db
    .select({
      post_id: likes.post_id,
      count:   sql<number>`cast(count(*) as integer)`.as("count"),
    })
    .from(likes)
    .groupBy(likes.post_id)
    .as("likes_sq")
}

async function attachTags(postIds: string[]): Promise<Map<string, TagPublic[]>> {
  const tagRows = await db
    .select({
      post_id: postTags.post_id,
      id:      tags.id,
      name:    tags.name,
      slug:    tags.slug,
    })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tag_id, tags.id))
    .where(inArray(postTags.post_id, postIds))

  const tagMap = new Map<string, TagPublic[]>()
  for (const row of tagRows) {
    const list = tagMap.get(row.post_id) ?? []
    list.push({ id: row.id, name: row.name, slug: row.slug })
    tagMap.set(row.post_id, list)
  }
  return tagMap
}

export const postRepository = {
  async create(data: typeof posts.$inferInsert): Promise<PostRecord> {
    const [row] = await db.insert(posts).values(data).returning()
    if (!row) throw new Error("Insert returned no rows")
    return row
  },

  async findById(id: string): Promise<PostRecord | undefined> {
    const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
    return row
  },

  async findBySlug(slug: string): Promise<PostPublic | undefined> {
    const likesCountSq = buildLikesSubquery()

    const [row] = await db
      .select({
        id:              posts.id,
        community_id:    posts.community_id,
        author_id:       posts.author_id,
        slug:            posts.slug,
        title:           posts.title,
        cover_image_url: posts.cover_image_url,
        content:         posts.content,
        status:          posts.status,
        published_at:    posts.published_at,
        created_at:      posts.created_at,
        updated_at:      posts.updated_at,
        author_name:     users.name,
        community_name:  communities.name,
        community_slug:  communities.slug,
        likes_count:     sql<number>`coalesce(${likesCountSq.count}, 0)`,
      })
      .from(posts)
      .innerJoin(users, eq(posts.author_id, users.id))
      .innerJoin(communities, eq(posts.community_id, communities.id))
      .leftJoin(likesCountSq, eq(posts.id, likesCountSq.post_id))
      .where(eq(posts.slug, slug))
      .limit(1)

    if (!row) return undefined

    const tagMap = await attachTags([row.id])

    return {
      ...row,
      author:    { id: row.author_id, name: row.author_name },
      community: { id: row.community_id, name: row.community_name, slug: row.community_slug },
      tags:      tagMap.get(row.id) ?? [],
    }
  },

  async findPublicById(id: string): Promise<PostPublic | undefined> {
    const likesCountSq = buildLikesSubquery()

    const [row] = await db
      .select({
        id:              posts.id,
        community_id:    posts.community_id,
        author_id:       posts.author_id,
        slug:            posts.slug,
        title:           posts.title,
        cover_image_url: posts.cover_image_url,
        content:         posts.content,
        status:          posts.status,
        published_at:    posts.published_at,
        created_at:      posts.created_at,
        updated_at:      posts.updated_at,
        author_name:     users.name,
        community_name:  communities.name,
        community_slug:  communities.slug,
        likes_count:     sql<number>`coalesce(${likesCountSq.count}, 0)`,
      })
      .from(posts)
      .innerJoin(users, eq(posts.author_id, users.id))
      .innerJoin(communities, eq(posts.community_id, communities.id))
      .leftJoin(likesCountSq, eq(posts.id, likesCountSq.post_id))
      .where(eq(posts.id, id))
      .limit(1)

    if (!row) return undefined

    const tagMap = await attachTags([row.id])

    return {
      ...row,
      author:    { id: row.author_id, name: row.author_name },
      community: { id: row.community_id, name: row.community_name, slug: row.community_slug },
      tags:      tagMap.get(row.id) ?? [],
    }
  },

  async update(id: string, data: Partial<typeof posts.$inferInsert>): Promise<PostRecord> {
    const [row] = await db
      .update(posts)
      .set({ ...data, updated_at: new Date() })
      .where(eq(posts.id, id))
      .returning()
    if (!row) throw new Error("Update returned no rows")
    return row
  },

  async deleteById(id: string): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id))
  },

  async existsBySlug(slug: string): Promise<boolean> {
    const [row] = await db.select({ id: posts.id }).from(posts).where(eq(posts.slug, slug)).limit(1)
    return !!row
  },

  async setTags(postId: string, tagIds: string[]): Promise<void> {
    await db.delete(postTags).where(eq(postTags.post_id, postId))
    if (tagIds.length > 0) {
      await db.insert(postTags).values(tagIds.map(tag_id => ({ post_id: postId, tag_id })))
    }
  },

  async findPublicByIds(ids: string[]): Promise<PostFeedItem[]> {
    const likesCountSq = buildLikesSubquery()

    const rows = await db
      .select({
        id:              posts.id,
        community_id:    posts.community_id,
        author_id:       posts.author_id,
        slug:            posts.slug,
        title:           posts.title,
        cover_image_url: posts.cover_image_url,
        status:          posts.status,
        published_at:    posts.published_at,
        created_at:      posts.created_at,
        updated_at:      posts.updated_at,
        author_name:     users.name,
        community_name:  communities.name,
        community_slug:  communities.slug,
        likes_count:     sql<number>`coalesce(${likesCountSq.count}, 0)`,
      })
      .from(posts)
      .innerJoin(users, eq(posts.author_id, users.id))
      .innerJoin(communities, eq(posts.community_id, communities.id))
      .leftJoin(likesCountSq, eq(posts.id, likesCountSq.post_id))
      .where(inArray(posts.id, ids))

    if (rows.length === 0) return []

    const tagMap = await attachTags(rows.map(r => r.id))

    return rows.map(r => ({
      ...r,
      author:    { id: r.author_id, name: r.author_name },
      community: { id: r.community_id, name: r.community_name, slug: r.community_slug },
      tags:      tagMap.get(r.id) ?? [],
    }))
  },

  async findFeed(filters: FeedFilters, sort: FeedSort, pagination: Pagination): Promise<PostFeedItem[]> {
    const likesCountSq = buildLikesSubquery()
    const offset = (pagination.page - 1) * pagination.limit

    const tagFilter = filters.tag_id
      ? sql`EXISTS (SELECT 1 FROM post_tags pt WHERE pt.post_id = ${posts.id} AND pt.tag_id = ${filters.tag_id}::uuid)`
      : undefined

    const rows = await db
      .select({
        id:              posts.id,
        community_id:    posts.community_id,
        author_id:       posts.author_id,
        slug:            posts.slug,
        title:           posts.title,
        cover_image_url: posts.cover_image_url,
        status:          posts.status,
        published_at:    posts.published_at,
        created_at:      posts.created_at,
        updated_at:      posts.updated_at,
        author_name:     users.name,
        community_name:  communities.name,
        community_slug:  communities.slug,
        likes_count:     sql<number>`coalesce(${likesCountSq.count}, 0)`,
      })
      .from(posts)
      .innerJoin(users, eq(posts.author_id, users.id))
      .innerJoin(communities, eq(posts.community_id, communities.id))
      .leftJoin(likesCountSq, eq(posts.id, likesCountSq.post_id))
      .where(and(
        eq(posts.status, "PUBLISHED"),
        filters.community_id ? eq(posts.community_id, filters.community_id) : undefined,
        tagFilter,
      ))
      .orderBy(sort === "popular" ? desc(sql`coalesce(${likesCountSq.count}, 0)`) : desc(posts.created_at))
      .limit(pagination.limit)
      .offset(offset)

    if (rows.length === 0) return []

    const tagMap = await attachTags(rows.map(r => r.id))

    return rows.map(r => ({
      ...r,
      author:    { id: r.author_id, name: r.author_name },
      community: { id: r.community_id, name: r.community_name, slug: r.community_slug },
      tags:      tagMap.get(r.id) ?? [],
    }))
  },
}
