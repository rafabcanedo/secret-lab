import * as yup from "yup"
import type { FastifyInstance } from "fastify"
import { likeController } from "../controllers/likes.js"

const userIdSchema = yup.object({ user_id: yup.string().uuid().required() })

export async function likeRoutes(app: FastifyInstance) {
  app.post<{ Params: { id: string } }>("/posts/:id/like", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return likeController.like(request, reply, body)
  })

  app.delete<{ Params: { id: string } }>("/posts/:id/like", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return likeController.unlike(request, reply, body)
  })
}
