import type { FastifyInstance } from "fastify"
import { tagController } from "../controllers/tags.js"

export async function tagRoutes(app: FastifyInstance) {
  app.get("/tags", async (request, reply) => {
    return tagController.list(request, reply)
  })
}
