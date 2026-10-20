import type { FastifyRequest, FastifyReply } from "fastify"
import { communityService } from "../services/communities.js"
import type { CreateCommunityInput } from "../validations/communities.js"

export const communityController = {
  async create(
    request: FastifyRequest,
    reply: FastifyReply,
    body: CreateCommunityInput
  ): Promise<void> {
    const community = await communityService.create(body, request.user.sub)
    reply.status(201).send(community)
  },

  async list(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const communities = await communityService.list()
    reply.send(communities)
  },

  async getBySlug(
    request: FastifyRequest<{ Params: { slug: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const community = await communityService.getBySlug(request.params.slug)
    reply.send(community)
  },

  async join(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await communityService.join(request.params.id, request.user.sub)
    reply.status(204).send()
  },

  async leave(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await communityService.leave(request.params.id, request.user.sub)
    reply.status(204).send()
  },
}
