import type { FastifyRequest, FastifyReply } from "fastify"
import { tagService } from "../services/tags.js"
import type { CreateTagInput } from "../validations/tags.js"

export const tagController = {
  async create(_request: FastifyRequest, reply: FastifyReply, body: CreateTagInput): Promise<void> {
    const tag = await tagService.create(body.name)
    reply.status(201).send(tag)
  },

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const tags = await tagService.list()
    reply.send(tags)
  },
}
