import type { posts } from "../db/schema/posts.js"

export type PostRecord = typeof posts.$inferSelect

export type TagPublic = {
  id: string
  name: string
  slug: string
}

type AuthorRef = {
  id: string
  name: string
}

type CommunityRef = {
  id: string
  name: string
  slug: string
}

type PostBase = {
  id: string
  community_id: string
  author_id: string
  slug: string | null
  title: string
  cover_image_url: string | null
  status: PostRecord["status"]
  published_at: Date | null
  created_at: Date
  updated_at: Date
  author: AuthorRef
  community: CommunityRef
  tags: TagPublic[]
  likes_count: number
}

export type PostFeedItem = PostBase & { excerpt: string | null }

export type PostPublic = PostBase & { content: string }

export type FeedFilters = {
  community_id?: string
  tag_id?: string
}

export type FeedSort = "recent" | "popular"

export type Pagination = {
  page: number
  limit: number
}
