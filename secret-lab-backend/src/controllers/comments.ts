import type { FastifyRequest, FastifyReply } from "fastify"
import { commentService } from "../services/comments.js"
import type { CreateCommentInput, UpdateCommentInput } from "../validations/comments.js"

export const commentController = {
  async create(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: CreateCommentInput
  ): Promise<void> {
    const comment = await commentService.create(request.params.id, request.user.sub, body)
    reply.status(201).send(comment)
  },

  async edit(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UpdateCommentInput
  ): Promise<void> {
    const comment = await commentService.edit(request.params.id, request.user.sub, body)
    reply.send(comment)
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await commentService.delete(request.params.id, request.user.sub)
    reply.status(204).send()
  },

  async listByPost(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const comments = await commentService.listByPost(request.params.id)
    reply.send(comments)
  },
}
