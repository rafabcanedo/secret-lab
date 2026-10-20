import { AppError } from "../shared/errors/AppError.js"
import { commentRepository } from "../repositories/comments.js"
import { postRepository } from "../repositories/posts.js"
import type { CommentPublic, CommentRecord } from "../types/comments.js"
import type { CreateCommentInput, UpdateCommentInput } from "../validations/comments.js"

export const commentService = {
  async create(postId: string, userId: string, data: CreateCommentInput): Promise<CommentRecord> {
    const post = await postRepository.findById(postId)
    if (!post) throw new AppError("Post not found", 404)
    if (post.status !== "PUBLISHED") throw new AppError("Post is not published", 400)

    if (data.parent_id) {
      const parent = await commentRepository.findById(data.parent_id)
      if (!parent) throw new AppError("Parent comment not found", 404)
      if (parent.post_id !== postId) throw new AppError("Parent comment does not belong to this post", 400)
      if (parent.parent_id !== null) throw new AppError("Replies to replies are not allowed", 400)
    }

    return commentRepository.create({
      post_id:   postId,
      author_id: userId,
      parent_id: data.parent_id ?? null,
      content:   data.content,
    })
  },

  async edit(commentId: string, userId: string, data: UpdateCommentInput): Promise<CommentRecord> {
    const comment = await commentRepository.findById(commentId)
    if (!comment) throw new AppError("Comment not found", 404)
    if (comment.author_id !== userId) throw new AppError("Forbidden", 403)
    return commentRepository.update(commentId, data.content)
  },

  async delete(commentId: string, userId: string): Promise<void> {
    const comment = await commentRepository.findById(commentId)
    if (!comment) throw new AppError("Comment not found", 404)
    if (comment.author_id !== userId) throw new AppError("Forbidden", 403)
    await commentRepository.deleteById(commentId)
  },

  async listByPost(postId: string): Promise<CommentPublic[]> {
    const post = await postRepository.findById(postId)
    if (!post) throw new AppError("Post not found", 404)
    return commentRepository.findByPostId(postId)
  },
}
