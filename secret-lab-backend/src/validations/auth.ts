import * as yup from "yup"

export const loginSchema = yup.object({
  email:    yup.string().email().required(),
  password: yup.string().required(),
})

export type LoginInput = yup.InferType<typeof loginSchema>
