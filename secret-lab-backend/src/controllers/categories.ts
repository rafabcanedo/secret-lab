import type { FastifyRequest, FastifyReply } from "fastify"
import { categoryService } from "../services/categories.js"

export const categoryController = {
  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const categories = await categoryService.list()
    reply.send(categories)
  },
}
