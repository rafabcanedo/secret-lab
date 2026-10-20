import * as yup from "yup"
import type { FastifyInstance } from "fastify"
import { bookmarkController } from "../controllers/bookmarks.js"

const userIdSchema = yup.object({ user_id: yup.string().uuid().required() })

export async function bookmarkRoutes(app: FastifyInstance) {
  app.post<{ Params: { id: string } }>("/posts/:id/bookmark", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return bookmarkController.save(request, reply, body)
  })

  app.delete<{ Params: { id: string } }>("/posts/:id/bookmark", async (request, reply) => {
    const body = await userIdSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return bookmarkController.unsave(request, reply, body)
  })

  app.get<{ Params: { id: string } }>("/users/:id/bookmarks", async (request, reply) => {
    return bookmarkController.listByUser(request, reply)
  })
}
