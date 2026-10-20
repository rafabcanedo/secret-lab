import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { bookmarkController } from "../controllers/bookmarks.js"

export async function bookmarkRoutes(app: FastifyInstance) {
  app.post<{ Params: { id: string } }>("/posts/:id/bookmark", { preHandler: authenticate }, async (request, reply) => {
    return bookmarkController.save(request, reply)
  })

  app.delete<{ Params: { id: string } }>("/posts/:id/bookmark", { preHandler: authenticate }, async (request, reply) => {
    return bookmarkController.unsave(request, reply)
  })

  app.get("/users/me/bookmarks", { preHandler: authenticate }, async (request, reply) => {
    return bookmarkController.listByUser(request, reply)
  })
}
