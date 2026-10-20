import { apiCall } from "@/lib/api-client"
import type { CommunityPublic } from "@/types"

export function getCommunityBySlug(slug: string): Promise<CommunityPublic> {
  return apiCall<CommunityPublic>(`/communities/${slug}`)
}
