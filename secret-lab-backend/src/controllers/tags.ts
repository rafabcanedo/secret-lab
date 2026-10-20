import type { FastifyRequest, FastifyReply } from "fastify"
import { tagService } from "../services/tags.js"

export const tagController = {
  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const tags = await tagService.list()
    reply.send(tags)
  },
}
