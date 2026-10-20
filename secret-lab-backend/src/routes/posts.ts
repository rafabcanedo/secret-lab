import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { postController } from "../controllers/posts.js"
import { createPostSchema, updatePostSchema, feedQuerySchema } from "../validations/posts.js"

export async function postRoutes(app: FastifyInstance) {
  app.post("/posts", { preHandler: authenticate }, async (request, reply) => {
    const body = await createPostSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return postController.create(request, reply, body)
  })

  app.patch<{ Params: { id: string } }>("/posts/:id", { preHandler: authenticate }, async (request, reply) => {
    const body = await updatePostSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return postController.update(request, reply, body)
  })

  app.patch<{ Params: { id: string } }>("/posts/:id/publish", { preHandler: authenticate }, async (request, reply) => {
    return postController.publish(request, reply)
  })

  app.delete<{ Params: { id: string } }>("/posts/:id", { preHandler: authenticate }, async (request, reply) => {
    return postController.delete(request, reply)
  })

  app.get("/posts", async (request, reply) => {
    const query = await feedQuerySchema.validate(request.query, { abortEarly: false, stripUnknown: true })
    return postController.getFeed(request, reply, query)
  })

  app.get<{ Params: { slug: string } }>("/posts/:slug", async (request, reply) => {
    return postController.getBySlug(request, reply)
  })
}
