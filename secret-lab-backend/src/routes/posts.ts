import * as yup from "yup"
import type { FastifyInstance } from "fastify"
import { postController } from "../controllers/posts.js"
import { createPostSchema, updatePostSchema, feedQuerySchema } from "../validations/posts.js"

const userIdSchema  = yup.object({ user_id: yup.string().uuid().required() })
const createSchema  = createPostSchema.concat(userIdSchema)
const updateSchema  = updatePostSchema.concat(userIdSchema)

export async function postRoutes(app: FastifyInstance) {
  app.post("/posts", async (request, reply) => {
    const body = await createSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return postController.create(request, reply, body)
  })

  app.patch<{ Params: { id: string } }>("/posts/:id", async (request, reply) => {
    const body = await updateSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return postController.update(request, reply, body)
  })

  app.patch<{ Params: { id: string } }>("/posts/:id/publish", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return postController.publish(request, reply, body)
  })

  app.delete<{ Params: { id: string } }>("/posts/:id", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return postController.delete(request, reply, body)
  })

  app.get("/posts", async (request, reply) => {
    const query = await feedQuerySchema.validate(request.query, { abortEarly: false, stripUnknown: true })
    return postController.getFeed(request, reply, query)
  })

  app.get<{ Params: { slug: string } }>("/posts/:slug", async (request, reply) => {
    return postController.getBySlug(request, reply)
  })
}
