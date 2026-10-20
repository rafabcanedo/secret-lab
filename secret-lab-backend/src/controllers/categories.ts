import type { FastifyRequest, FastifyReply } from "fastify"
import { categoryService } from "../services/categories.js"
import type { CreateCategoryInput } from "../validations/categories.js"

export const categoryController = {
  async create(_request: FastifyRequest, reply: FastifyReply, body: CreateCategoryInput): Promise<void> {
    const category = await categoryService.create(body.name)
    reply.status(201).send(category)
  },

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const categories = await categoryService.list()
    reply.send(categories)
  },
}
