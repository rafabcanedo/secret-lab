import { and, eq } from "drizzle-orm"
import { db } from "../db/index.js"
import { likes } from "../db/schema/likes.js"

export const likeRepository = {
  async add(postId: string, userId: string): Promise<void> {
    await db.insert(likes).values({ post_id: postId, user_id: userId })
  },

  async remove(postId: string, userId: string): Promise<void> {
    await db.delete(likes).where(and(eq(likes.post_id, postId), eq(likes.user_id, userId)))
  },

  async exists(postId: string, userId: string): Promise<boolean> {
    const [row] = await db
      .select({ post_id: likes.post_id })
      .from(likes)
      .where(and(eq(likes.post_id, postId), eq(likes.user_id, userId)))
      .limit(1)
    return !!row
  },
}
