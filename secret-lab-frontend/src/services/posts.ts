import { apiCall } from "@/lib/api-client"
import type { PostFeedItem } from "@/types"

export type PostFeedParams = {
  communityId?: string
  tagId?: string
  sort?: "recent" | "popular"
  page?: number
  limit?: number
}

export type PostFeedResponse = {
  data: PostFeedItem[]
  page: number
  limit: number
  total: number
}

export function getPosts(params: PostFeedParams = {}): Promise<PostFeedResponse> {
  const query = new URLSearchParams()
  if (params.communityId) query.set("community_id", params.communityId)
  if (params.tagId) query.set("tag_id", params.tagId)
  if (params.sort) query.set("sort", params.sort)
  if (params.page) query.set("page", String(params.page))
  if (params.limit) query.set("limit", String(params.limit))
  const qs = query.toString()
  return apiCall<PostFeedResponse>(`/posts${qs ? `?${qs}` : ""}`)
}
