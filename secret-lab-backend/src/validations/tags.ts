import * as yup from "yup"

export const createTagSchema = yup.object({
  name: yup.string().max(100).required(),
})

export type CreateTagInput = yup.InferType<typeof createTagSchema>
