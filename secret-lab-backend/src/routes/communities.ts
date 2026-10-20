import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { communityController } from "../controllers/communities.js"
import { createCommunitySchema } from "../validations/communities.js"

export async function communityRoutes(app: FastifyInstance) {
  app.post("/communities", { preHandler: authenticate }, async (request, reply) => {
    const body = await createCommunitySchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return communityController.create(request, reply, body)
  })

  app.get("/communities", async (request, reply) => {
    return communityController.list(request, reply)
  })

  app.get<{ Params: { slug: string } }>("/communities/:slug", async (request, reply) => {
    return communityController.getBySlug(request, reply)
  })

  app.post<{ Params: { id: string } }>("/communities/:id/join", { preHandler: authenticate }, async (request, reply) => {
    return communityController.join(request, reply)
  })

  app.delete<{ Params: { id: string } }>("/communities/:id/leave", { preHandler: authenticate }, async (request, reply) => {
    return communityController.leave(request, reply)
  })
}
