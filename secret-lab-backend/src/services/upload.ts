import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { AppError } from "../shared/errors/AppError.js"
import { r2 } from "../shared/utils/r2.js"
import { env } from "../config/env.js"
import { postRepository } from "../repositories/posts.js"

export const uploadService = {
  async getCoverPresignedUrl(postId: string, userId: string): Promise<{ upload_url: string; public_url: string }> {
    const post = await postRepository.findById(postId)
    if (!post) throw new AppError("Post not found", 404)
    if (post.author_id !== userId) throw new AppError("Forbidden", 403)

    const key = `covers/${postId}`

    const command = new PutObjectCommand({
      Bucket:      env.R2_BUCKET_NAME,
      Key:         key,
      ContentType: "image/*",
    })

    const upload_url = await getSignedUrl(r2, command, { expiresIn: 300 })
    const public_url = `${env.R2_PUBLIC_URL}/${key}`

    return { upload_url, public_url }
  },
}
