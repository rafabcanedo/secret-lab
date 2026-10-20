import { eq } from "drizzle-orm"
import { db } from "../db/index.js"
import { comments } from "../db/schema/comments.js"
import { users } from "../db/schema/users.js"
import type { CommentRecord, CommentPublic } from "../types/comments.js"

export const commentRepository = {
  async create(data: typeof comments.$inferInsert): Promise<CommentRecord> {
    const [row] = await db.insert(comments).values(data).returning()
    if (!row) throw new Error("Insert returned no rows")
    return row
  },

  async findById(id: string): Promise<CommentRecord | undefined> {
    const [row] = await db.select().from(comments).where(eq(comments.id, id)).limit(1)
    return row
  },

  async findByPostId(postId: string): Promise<CommentPublic[]> {
    const rows = await db
      .select({
        id:          comments.id,
        post_id:     comments.post_id,
        author_id:   comments.author_id,
        parent_id:   comments.parent_id,
        content:     comments.content,
        created_at:  comments.created_at,
        updated_at:  comments.updated_at,
        author_name: users.name,
      })
      .from(comments)
      .innerJoin(users, eq(comments.author_id, users.id))
      .where(eq(comments.post_id, postId))
      .orderBy(comments.created_at)

    const replyMap = new Map<string, CommentPublic[]>()
    const roots: CommentPublic[] = []

    for (const row of rows) {
      const node: CommentPublic = { ...row, replies: [] }
      if (row.parent_id === null) {
        roots.push(node)
        replyMap.set(row.id, node.replies)
      }
    }

    for (const row of rows) {
      if (row.parent_id !== null) {
        const bucket = replyMap.get(row.parent_id)
        if (bucket) bucket.push({ ...row, replies: [] })
      }
    }

    return roots
  },

  async update(id: string, content: string): Promise<CommentRecord> {
    const [row] = await db
      .update(comments)
      .set({ content, updated_at: new Date() })
      .where(eq(comments.id, id))
      .returning()
    if (!row) throw new Error("Update returned no rows")
    return row
  },

  async deleteById(id: string): Promise<void> {
    await db.delete(comments).where(eq(comments.id, id))
  },
}
