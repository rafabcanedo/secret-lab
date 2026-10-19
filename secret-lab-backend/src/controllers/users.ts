import type { FastifyReply, FastifyRequest } from "fastify"
import { userService } from "../services/users.js"
import type { CreateUserInput, UpdateUserInput } from "../validations/users.js"

export const userController = {
  async register(
    _request: FastifyRequest,
    reply: FastifyReply,
    body: CreateUserInput
  ): Promise<void> {
    const user = await userService.register(body)
    reply.status(201).send(user)
  },

  async getProfile(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const user = await userService.getProfile(request.params.id)
    reply.send(user)
  },

  async updateProfile(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
    body: UpdateUserInput
  ): Promise<void> {
    const user = await userService.updateProfile(request.params.id, body)
    reply.send(user)
  },

  async deleteAccount(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    await userService.deleteAccount(request.params.id)
    reply.status(204).send()
  },
}
