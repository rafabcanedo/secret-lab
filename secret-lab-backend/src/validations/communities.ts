import * as yup from "yup"

export const createCommunitySchema = yup.object({
  name:         yup.string().max(100).required(),
  description:  yup.string().max(500).optional(),
  category_ids: yup.array(yup.string().uuid().required()).max(3).optional(),
})

export type CreateCommunityInput = yup.InferType<typeof createCommunitySchema>
