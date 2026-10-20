import { AppError } from "../shared/errors/AppError.js"
import { notificationRepository } from "../repositories/notifications.js"
import type { NotificationPublic } from "../types/notifications.js"
import type { notifications } from "../db/schema/notifications.js"

type CreateNotificationData = typeof notifications.$inferInsert

export const notificationService = {
  async create(data: CreateNotificationData): Promise<void> {
    if (data.actor_id === data.user_id) return
    await notificationRepository.create(data)
  },

  async listByUser(userId: string): Promise<NotificationPublic[]> {
    return notificationRepository.findByUserId(userId)
  },

  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const notification = await notificationRepository.findById(notificationId)
    if (!notification) throw new AppError("Notification not found", 404)
    if (notification.user_id !== userId) throw new AppError("Forbidden", 403)
    await notificationRepository.markAsRead(notificationId)
  },
}
