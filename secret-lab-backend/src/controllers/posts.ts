import type { FastifyRequest, FastifyReply } from "fastify"
import { postService } from "../services/posts.js"
import type { CreatePostInput, UpdatePostInput, FeedQueryInput } from "../validations/posts.js"

type CreateBody  = CreatePostInput & { user_id: string }
type UpdateBody  = UpdatePostInput & { user_id: string }
type UserBody    = { user_id: string }

export const postController = {
  async create(
    _request: FastifyRequest,
    reply: FastifyReply,
    body: CreateBody
  ): Promise<void> {
    const { user_id, ...data } = body
    const post = await postService.create(data, user_id)
    reply.status(201).send(post)
  },

  async update(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UpdateBody
  ): Promise<void> {
    const { user_id, ...data } = body
    const post = await postService.update(request.params.id, data, user_id)
    reply.send(post)
  },

  async publish(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    const post = await postService.publish(request.params.id, body.user_id)
    reply.send(post)
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    await postService.delete(request.params.id, body.user_id)
    reply.status(204).send()
  },

  async getFeed(
    _request: FastifyRequest,
    reply: FastifyReply,
    query: FeedQueryInput
  ): Promise<void> {
    const posts = await postService.getFeed(query)
    reply.send(posts)
  },

  async getBySlug(
    request: FastifyRequest<{ Params: { slug: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const post = await postService.getBySlug(request.params.slug)
    reply.send(post)
  },
}
