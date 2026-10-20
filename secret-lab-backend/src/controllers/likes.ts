import type { FastifyRequest, FastifyReply } from "fastify"
import { likeService } from "../services/likes.js"

type UserBody = { user_id: string }

export const likeController = {
  async like(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    await likeService.like(request.params.id, body.user_id)
    reply.status(204).send()
  },

  async unlike(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    await likeService.unlike(request.params.id, body.user_id)
    reply.status(204).send()
  },
}
