import type { FastifyRequest, FastifyReply } from "fastify"
import { postService } from "../services/posts.js"
import type { CreatePostInput, UpdatePostInput, FeedQueryInput } from "../validations/posts.js"

export const postController = {
  async create(
    request: FastifyRequest,
    reply: FastifyReply,
    body: CreatePostInput
  ): Promise<void> {
    const post = await postService.create(body, request.user.sub)
    reply.status(201).send(post)
  },

  async update(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UpdatePostInput
  ): Promise<void> {
    const post = await postService.update(request.params.id, body, request.user.sub)
    reply.send(post)
  },

  async publish(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const post = await postService.publish(request.params.id, request.user.sub)
    reply.send(post)
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await postService.delete(request.params.id, request.user.sub)
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
