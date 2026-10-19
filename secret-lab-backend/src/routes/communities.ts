import * as yup from "yup"
import type { FastifyInstance } from "fastify"
import { communityController } from "../controllers/communities.js"
import { createCommunitySchema } from "../validations/communities.js"

const userIdSchema  = yup.object({ user_id: yup.string().uuid().required() })
const createSchema  = createCommunitySchema.concat(userIdSchema)

export async function communityRoutes(app: FastifyInstance) {
  app.post("/communities", async (request, reply) => {
    const body = await createSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return communityController.create(request, reply, body)
  })

  app.get("/communities", async (request, reply) => {
    return communityController.list(request, reply)
  })

  app.get<{ Params: { slug: string } }>("/communities/:slug", async (request, reply) => {
    return communityController.getBySlug(request, reply)
  })

  app.post<{ Params: { id: string } }>("/communities/:id/join", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return communityController.join(request, reply, body)
  })

  app.delete<{ Params: { id: string } }>("/communities/:id/leave", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return communityController.leave(request, reply, body)
  })
}
