import type { FastifyInstance } from "fastify"
import { tagController } from "../controllers/tags.js"
import { createTagSchema } from "../validations/tags.js"

export async function tagRoutes(app: FastifyInstance) {
  app.post("/tags", async (request, reply) => {
    const body = await createTagSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return tagController.create(request, reply, body)
  })

  app.get("/tags", async (request, reply) => {
    return tagController.list(request, reply)
  })
}
