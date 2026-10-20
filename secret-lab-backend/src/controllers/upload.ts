import type { FastifyRequest, FastifyReply } from "fastify"
import { uploadService } from "../services/upload.js"

export const uploadController = {
  async getCoverPresignedUrl(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const result = await uploadService.getCoverPresignedUrl(request.params.id, request.user.sub)
    reply.send(result)
  },
}
