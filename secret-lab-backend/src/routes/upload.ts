import type { FastifyInstance } from "fastify"
import { authenticate } from "../shared/middlewares/auth.js"
import { uploadController } from "../controllers/upload.js"

export async function uploadRoutes(app: FastifyInstance) {
  app.post<{ Params: { id: string } }>("/posts/:id/cover", { preHandler: authenticate }, async (request, reply) => {
    return uploadController.getCoverPresignedUrl(request, reply)
  })
}
