import type { FastifyRequest, FastifyReply } from "fastify"
import { communityService } from "../services/communities.js"
import type { CreateCommunityInput } from "../validations/communities.js"

type CreateBody = CreateCommunityInput & { user_id: string }
type UserBody   = { user_id: string }

export const communityController = {
  async create(
    _request: FastifyRequest,
    reply: FastifyReply,
    body: CreateBody
  ): Promise<void> {
    const { user_id, ...data } = body
    const community = await communityService.create(data, user_id)
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
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    await communityService.join(request.params.id, body.user_id)
    reply.status(204).send()
  },

  async leave(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UserBody
  ): Promise<void> {
    await communityService.leave(request.params.id, body.user_id)
    reply.status(204).send()
  },
}
