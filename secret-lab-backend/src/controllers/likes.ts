import type { FastifyRequest, FastifyReply } from "fastify"
import { likeService } from "../services/likes.js"

export const likeController = {
  async like(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await likeService.like(request.params.id, request.user.sub)
    reply.status(204).send()
  },

  async unlike(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await likeService.unlike(request.params.id, request.user.sub)
    reply.status(204).send()
  },
}
