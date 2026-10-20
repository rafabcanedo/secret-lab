import type { FastifyInstance } from "fastify"
import { categoryController } from "../controllers/categories.js"
import { createCategorySchema } from "../validations/categories.js"

export async function categoryRoutes(app: FastifyInstance) {
  app.post("/categories", async (request, reply) => {
    const body = await createCategorySchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return categoryController.create(request, reply, body)
  })

  app.get("/categories", async (request, reply) => {
    return categoryController.list(request, reply)
  })
}
