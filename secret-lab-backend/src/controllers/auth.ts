import type { FastifyRequest, FastifyReply } from "fastify"
import { authService } from "../services/auth.js"
import type { LoginInput } from "../validations/auth.js"

export const authController = {
  async login(_request: FastifyRequest, reply: FastifyReply, body: LoginInput): Promise<void> {
    const { userId, user } = await authService.login(body.email, body.password)
    const token = await reply.jwtSign({ sub: userId })
    reply
      .setCookie("token", token, {
        httpOnly: true,
        secure:   process.env["NODE_ENV"] === "production",
        sameSite: "strict",
        path:     "/",
      })
      .send(user)
  },

  async logout(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.clearCookie("token", { path: "/" }).status(204).send()
  },

  async me(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = await authService.me(request.user.sub)
    reply.send(user)
  },
}
