import * as yup from "yup"
import {
  emailField,
  passwordField,
  nameField,
  crmField,
  ufField,
  specialtyField,
  titleField,
  contentField,
  descriptionField,
} from "./fields"

export const signInSchema = yup.object({
  email: emailField,
  password: passwordField,
})

export const signUpSchema = yup.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  crm: crmField,
  uf: ufField,
  specialty: specialtyField,
})

export const createPostSchema = yup.object({
  title: titleField,
  content: contentField,
  communityId: yup.string().required("Community is required"),
  coverImageUrl: yup.string().url().nullable(),
  tags: yup.array(yup.string().required()).max(3, "Maximum 3 tags").default([]),
})

export const createCommunitySchema = yup.object({
  name: nameField,
  description: descriptionField,
  categories: yup.array(yup.string().required()).min(1, "At least 1 category required").max(3, "Maximum 3 categories").required(),
})

export const commentSchema = yup.object({
  content: contentField,
})
