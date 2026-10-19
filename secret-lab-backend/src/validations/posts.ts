import * as yup from "yup"

export const createPostSchema = yup.object({
  community_id:    yup.string().uuid().required(),
  title:           yup.string().max(200).required(),
  content:         yup.string().required(),
  cover_image_url: yup.string().url().optional(),
  tag_ids:         yup.array(yup.string().uuid().required()).max(3).optional(),
})

export const updatePostSchema = yup.object({
  title:           yup.string().max(200).optional(),
  content:         yup.string().optional(),
  cover_image_url: yup.string().url().optional(),
  tag_ids:         yup.array(yup.string().uuid().required()).max(3).optional(),
})

export const feedQuerySchema = yup.object({
  sort:         yup.mixed<"recent" | "popular">().oneOf(["recent", "popular"]).default("recent"),
  community_id: yup.string().uuid().optional(),
  tag_id:       yup.string().uuid().optional(),
  page:         yup.number().integer().min(1).default(1),
  limit:        yup.number().integer().min(1).max(50).default(20),
})

export type CreatePostInput  = yup.InferType<typeof createPostSchema>
export type UpdatePostInput  = yup.InferType<typeof updatePostSchema>
export type FeedQueryInput   = yup.InferType<typeof feedQuerySchema>
