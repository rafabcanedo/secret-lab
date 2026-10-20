import * as yup from "yup"
import type { FastifyInstance } from "fastify"
import { commentController } from "../controllers/comments.js"
import { createCommentSchema, updateCommentSchema } from "../validations/comments.js"

const userIdSchema = yup.object({ user_id: yup.string().uuid().required() })

export async function commentRoutes(app: FastifyInstance) {
  app.post<{ Params: { id: string } }>("/posts/:id/comments", async (request, reply) => {
    const body = await createCommentSchema.concat(userIdSchema).validate(request.body, { abortEarly: false, stripUnknown: true })
    return commentController.create(request, reply, body)
  })

  app.get<{ Params: { id: string } }>("/posts/:id/comments", async (request, reply) => {
    return commentController.listByPost(request, reply)
  })

  app.patch<{ Params: { id: string } }>("/comments/:id", async (request, reply) => {
    const body = await updateCommentSchema.concat(userIdSchema).validate(request.body, { abortEarly: false, stripUnknown: true })
    return commentController.edit(request, reply, body)
  })

  app.delete<{ Params: { id: string } }>("/comments/:id", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return commentController.delete(request, reply, body)
  })
}
