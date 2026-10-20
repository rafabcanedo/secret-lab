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

export type PostAuthor = {
  id: string
  name: string
}

export type PostCommunityRef = {
  id: string
  name: string
  slug: string
}

export type PostTag = {
  id: string
  name: string
  slug: string
}

export type PostCategory = {
  id: string
  name: string
  slug: string
}

export type PostFeedItem = {
  id: string
  communityId: string
  authorId: string
  slug: string
  title: string
  coverImageUrl: string | null
  excerpt: string | null
  status: PostStatus
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: PostAuthor
  community: PostCommunityRef
  tags: PostTag[]
  likesCount: number
}

export type PostPublic = PostFeedItem & {
  content: string
}

export type CommunityPublic = {
  id: string
  creatorId: string
  name: string
  slug: string
  description: string | null
  createdAt: string
  updatedAt: string
  memberCount: number
  categories: PostCategory[]
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
