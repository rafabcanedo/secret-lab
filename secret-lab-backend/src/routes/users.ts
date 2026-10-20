import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { userController } from "../controllers/users.js"
import { createUserSchema, updateUserSchema } from "../validations/users.js"

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    const body = await createUserSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return userController.register(request, reply, body)
  })

  app.get<{ Params: { id: string } }>("/users/:id", async (request, reply) => {
    return userController.getProfile(request, reply)
  })

  app.patch("/users/me", { preHandler: authenticate }, async (request, reply) => {
    const body = await updateUserSchema.validate(request.body, { abortEarly: false, stripUnknown: true })
    return userController.updateProfile(request, reply, body)
  })

  app.delete("/users/me", { preHandler: authenticate }, async (request, reply) => {
    return userController.deleteAccount(request, reply)
  })
}
