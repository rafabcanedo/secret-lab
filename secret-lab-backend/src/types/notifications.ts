import type { notifications } from "../db/schema/notifications.js"

export type NotificationRecord = typeof notifications.$inferSelect

export type NotificationPublic = {
  id: string
  user_id: string
  actor_id: string
  actor_name: string
  type: "LIKE" | "COMMENT" | "REPLY"
  post_id: string | null
  comment_id: string | null
  read_at: Date | null
  created_at: Date
}
