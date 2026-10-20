import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { commentController } from "../controllers/comments.js"
import { createCommentSchema, updateCommentSchema } from "../validations/comments.js"

export async function commentRoutes(app: FastifyInstance) {
  app.post<{ Params: { id: string } }>("/posts/:id/comments", { preHandler: authenticate }, async (request, reply) => {
    const body = await createCommentSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return commentController.create(request, reply, body)
  })

  app.get<{ Params: { id: string } }>("/posts/:id/comments", async (request, reply) => {
    return commentController.listByPost(request, reply)
  })

  app.patch<{ Params: { id: string } }>("/comments/:id", { preHandler: authenticate }, async (request, reply) => {
    const body = await updateCommentSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return commentController.edit(request, reply, body)
  })

  app.delete<{ Params: { id: string } }>("/comments/:id", { preHandler: authenticate }, async (request, reply) => {
    return commentController.delete(request, reply)
  })
}
