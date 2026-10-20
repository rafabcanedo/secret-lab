import * as yup from "yup"

export const createCommentSchema = yup.object({
  content:   yup.string().required(),
  parent_id: yup.string().uuid().optional(),
})

export const updateCommentSchema = yup.object({
  content: yup.string().required(),
})

export type CreateCommentInput = yup.InferType<typeof createCommentSchema>
export type UpdateCommentInput = yup.InferType<typeof updateCommentSchema>
