import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { likeController } from "../controllers/likes.js"

export async function likeRoutes(app: FastifyInstance) {
  app.post<{ Params: { id: string } }>("/posts/:id/like", { preHandler: authenticate }, async (request, reply) => {
    return likeController.like(request, reply)
  })

  app.delete<{ Params: { id: string } }>("/posts/:id/like", { preHandler: authenticate }, async (request, reply) => {
    return likeController.unlike(request, reply)
  })
}
