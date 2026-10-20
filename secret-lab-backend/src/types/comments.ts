import type { comments } from "../db/schema/comments.js"

export type CommentRecord = typeof comments.$inferSelect

export type CommentPublic = {
  id: string
  post_id: string
  author_id: string
  parent_id: string | null
  content: string
  created_at: Date
  updated_at: Date
  author_name: string
  replies: CommentPublic[]
}
