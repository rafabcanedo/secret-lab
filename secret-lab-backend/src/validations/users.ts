import * as yup from "yup"

const SPECIALTIES = ["RADIOLOGIA", "PEDIATRIA", "DERMATOLOGIA"] as const
type Specialty = typeof SPECIALTIES[number]

export const createUserSchema = yup.object({
  name:      yup.string().max(100).required(),
  crm:       yup.string().matches(/^\d{4,6}$/, "CRM must be 4 to 6 digits").required(),
  uf:        yup.string().matches(/^[A-Z]{2}$/, "UF must be 2 uppercase letters").required(),
  specialty: yup.mixed<Specialty>().oneOf([...SPECIALTIES]).required(),
  email:     yup.string().email().max(255).required(),
  password:  yup.string().min(8).required(),
})

export const updateUserSchema = yup.object({
  name:      yup.string().max(100),
  crm:       yup.string().matches(/^\d{4,6}$/, "CRM must be 4 to 6 digits"),
  uf:        yup.string().matches(/^[A-Z]{2}$/, "UF must be 2 uppercase letters"),
  specialty: yup.mixed<Specialty>().oneOf([...SPECIALTIES]),
  email:     yup.string().email().max(255),
  password:  yup.string().min(8),
})

export type CreateUserInput = yup.InferType<typeof createUserSchema>
export type UpdateUserInput = yup.InferType<typeof updateUserSchema>
