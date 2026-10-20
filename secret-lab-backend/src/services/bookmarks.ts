import { AppError } from "../shared/errors/AppError.js"
import { bookmarkRepository } from "../repositories/bookmarks.js"
import { postRepository } from "../repositories/posts.js"
import type { PostFeedItem } from "../types/posts.js"

export const bookmarkService = {
  async save(postId: string, userId: string): Promise<void> {
    const post = await postRepository.findById(postId)
    if (!post) throw new AppError("Post not found", 404)
    if (post.status !== "PUBLISHED") throw new AppError("Post is not published", 400)

    const already = await bookmarkRepository.exists(postId, userId)
    if (already) throw new AppError("Already bookmarked", 409)

    await bookmarkRepository.add(postId, userId)
  },

  async unsave(postId: string, userId: string): Promise<void> {
    const post = await postRepository.findById(postId)
    if (!post) throw new AppError("Post not found", 404)

    const exists = await bookmarkRepository.exists(postId, userId)
    if (!exists) throw new AppError("Bookmark not found", 404)

    await bookmarkRepository.remove(postId, userId)
  },

  async listByUser(userId: string): Promise<PostFeedItem[]> {
    const ids = await bookmarkRepository.findPostIdsByUser(userId)
    if (ids.length === 0) return []
    return postRepository.findPublicByIds(ids)
  },
}
