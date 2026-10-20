import type { FastifyInstance } from "fastify"
import { categoryController } from "../controllers/categories.js"

export async function categoryRoutes(app: FastifyInstance) {
  app.get("/categories", async (request, reply) => {
    return categoryController.list(request, reply)
  })
}
