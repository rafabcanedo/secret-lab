import { eq } from "drizzle-orm"
import { db } from "../db/index.js"
import { notifications } from "../db/schema/notifications.js"
import { users } from "../db/schema/users.js"
import type { NotificationRecord, NotificationPublic } from "../types/notifications.js"

export const notificationRepository = {
  async create(data: typeof notifications.$inferInsert): Promise<NotificationRecord> {
    const [row] = await db.insert(notifications).values(data).returning()
    if (!row) throw new Error("Insert returned no rows")
    return row
  },

  async findByUserId(userId: string): Promise<NotificationPublic[]> {
    const actors = users
    return db
      .select({
        id:         notifications.id,
        user_id:    notifications.user_id,
        actor_id:   notifications.actor_id,
        actor_name: actors.name,
        type:       notifications.type,
        post_id:    notifications.post_id,
        comment_id: notifications.comment_id,
        read_at:    notifications.read_at,
        created_at: notifications.created_at,
      })
      .from(notifications)
      .innerJoin(actors, eq(notifications.actor_id, actors.id))
      .where(eq(notifications.user_id, userId))
      .orderBy(notifications.created_at)
  },

  async markAsRead(id: string): Promise<void> {
    await db
      .update(notifications)
      .set({ read_at: new Date() })
      .where(eq(notifications.id, id))
  },

  async findById(id: string): Promise<NotificationRecord | undefined> {
    const [row] = await db.select().from(notifications).where(eq(notifications.id, id)).limit(1)
    return row
  },
}
