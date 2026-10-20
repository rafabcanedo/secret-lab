import type { FastifyRequest, FastifyReply } from "fastify"
import { bookmarkService } from "../services/bookmarks.js"

type UserBody = { user_id: string }

export const bookmarkController = {
  async save(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    await bookmarkService.save(request.params.id, body.user_id)
    reply.status(204).send()
  },

  async unsave(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    await bookmarkService.unsave(request.params.id, body.user_id)
    reply.status(204).send()
  },

  async listByUser(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const posts = await bookmarkService.listByUser(request.params.id)
    reply.send(posts)
  },
}
