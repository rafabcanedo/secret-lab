import type { FastifyRequest, FastifyReply } from "fastify"
import { notificationService } from "../services/notifications.js"

export const notificationController = {
  async listByUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const items = await notificationService.listByUser(request.user.sub)
    reply.send(items)
  },

  async markAsRead(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await notificationService.markAsRead(request.params.id, request.user.sub)
    reply.status(204).send()
  },
}
