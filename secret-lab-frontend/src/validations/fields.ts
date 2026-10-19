import * as yup from "yup"
import { UF, Speciality } from "@/enums"

export const emailField = yup.string().email("Invalid email").required("Email is required")

export const passwordField = yup.string().min(6, "Password must be at least 6 characters").required("Password is required")

export const nameField = yup.string().trim().required("Name is required")

export const crmField = yup.string().matches(/^\d+$/, "CRM must contain only digits").required("CRM is required")

export const ufField = yup.string().oneOf(Object.values(UF), "Invalid UF").required("UF is required")

export const specialtyField = yup.string().oneOf(Object.values(Speciality), "Invalid specialty").required("Specialty is required")

export const titleField = yup.string().trim().max(200, "Title must be at most 200 characters").required("Title is required")

export const contentField = yup.string().required("Content is required")

export const descriptionField = yup.string().trim()
