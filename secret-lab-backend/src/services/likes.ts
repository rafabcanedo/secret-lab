import { AppError } from "../shared/errors/AppError.js"
import { likeRepository } from "../repositories/likes.js"
import { postRepository } from "../repositories/posts.js"

export const likeService = {
  async like(postId: string, userId: string): Promise<void> {
    const post = await postRepository.findById(postId)
    if (!post) throw new AppError("Post not found", 404)
    if (post.status !== "PUBLISHED") throw new AppError("Post is not published", 400)

    const already = await likeRepository.exists(postId, userId)
    if (already) throw new AppError("Already liked", 409)

    await likeRepository.add(postId, userId)
  },

  async unlike(postId: string, userId: string): Promise<void> {
    const post = await postRepository.findById(postId)
    if (!post) throw new AppError("Post not found", 404)

    const exists = await likeRepository.exists(postId, userId)
    if (!exists) throw new AppError("Like not found", 404)

    await likeRepository.remove(postId, userId)
  },
}
