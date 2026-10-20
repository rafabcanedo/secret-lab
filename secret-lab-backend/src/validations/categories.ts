import * as yup from "yup"

export const createCategorySchema = yup.object({
  name: yup.string().max(100).required(),
})

export type CreateCategoryInput = yup.InferType<typeof createCategorySchema>
