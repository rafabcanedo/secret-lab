import type { FastifyRequest, FastifyReply } from "fastify"
import { commentService } from "../services/comments.js"
import type { CreateCommentInput, UpdateCommentInput } from "../validations/comments.js"

type UserBody = { user_id: string }

export const commentController = {
  async create(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: CreateCommentInput & UserBody
  ): Promise<void> {
    const comment = await commentService.create(request.params.id, body.user_id, body)
    reply.status(201).send(comment)
  },

  async edit(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UpdateCommentInput & UserBody
  ): Promise<void> {
    const comment = await commentService.edit(request.params.id, body.user_id, body)
    reply.send(comment)
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    await commentService.delete(request.params.id, body.user_id)
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
