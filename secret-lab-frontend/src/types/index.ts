import type { PostStatus, NotificationType, Speciality } from "@/enums"

export type User = {
  id: string
  name: string
  crm: string
  uf: string
  specialty: Speciality
  email: string
  createdAt: string
  updatedAt: string
}

export type Post = {
  id: string
  communityId: string
  authorId: string
  slug: string | null
  title: string
  coverImageUrl: string | null
  content: string
  status: PostStatus
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export type Community = {
  id: string
  creatorId: string
  name: string
  slug: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export type Tag = {
  id: string
  name: string
  slug: string
  createdAt: string
}

export type Category = {
  id: string
  name: string
  slug: string
  createdAt: string
}

export type Comment = {
  id: string
  postId: string
  authorId: string
  parentId: string | null
  content: string
  createdAt: string
  updatedAt: string
}

export type Notification = {
  id: string
  userId: string
  actorId: string
  type: NotificationType
  postId: string | null
  commentId: string | null
  readAt: string | null
  createdAt: string
}
