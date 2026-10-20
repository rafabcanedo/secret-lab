import { and, eq } from "drizzle-orm"
import { db } from "../db/index.js"
import { bookmarks } from "../db/schema/bookmarks.js"

export const bookmarkRepository = {
  async add(postId: string, userId: string): Promise<void> {
    await db.insert(bookmarks).values({ post_id: postId, user_id: userId })
  },

  async remove(postId: string, userId: string): Promise<void> {
    await db.delete(bookmarks).where(and(eq(bookmarks.post_id, postId), eq(bookmarks.user_id, userId)))
  },

  async exists(postId: string, userId: string): Promise<boolean> {
    const [row] = await db
      .select({ post_id: bookmarks.post_id })
      .from(bookmarks)
      .where(and(eq(bookmarks.post_id, postId), eq(bookmarks.user_id, userId)))
      .limit(1)
    return !!row
  },

  async findPostIdsByUser(userId: string): Promise<string[]> {
    const rows = await db
      .select({ post_id: bookmarks.post_id })
      .from(bookmarks)
      .where(eq(bookmarks.user_id, userId))
    return rows.map(r => r.post_id)
  },
}
