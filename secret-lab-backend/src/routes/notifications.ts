import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { notificationController } from "../controllers/notifications.js"

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/users/me/notifications", { preHandler: authenticate }, async (request, reply) => {
    return notificationController.listByUser(request, reply)
  })

  app.patch<{ Params: { id: string } }>("/notifications/:id/read", { preHandler: authenticate }, async (request, reply) => {
    return notificationController.markAsRead(request, reply)
  })
}
