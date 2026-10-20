import type { FastifyRequest, FastifyReply } from "fastify"
import { bookmarkService } from "../services/bookmarks.js"

export const bookmarkController = {
  async save(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await bookmarkService.save(request.params.id, request.user.sub)
    reply.status(204).send()
  },

  async unsave(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await bookmarkService.unsave(request.params.id, request.user.sub)
    reply.status(204).send()
  },

  async listByUser(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const posts = await bookmarkService.listByUser(request.user.sub)
    reply.send(posts)
  },
}
