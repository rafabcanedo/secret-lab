import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { authController } from "../controllers/auth.js"
import { loginSchema } from "../validations/auth.js"

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", async (request, reply) => {
    const body = await loginSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return authController.login(request, reply, body)
  })

  app.post("/auth/logout", async (request, reply) => {
    return authController.logout(request, reply)
  })

  app.get("/auth/me", { preHandler: authenticate }, async (request, reply) => {
    return authController.me(request, reply)
  })
}
