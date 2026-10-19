import type { communities } from "../db/schema/communities.js"

export type CommunityRecord = typeof communities.$inferSelect

export type CategoryPublic = {
  id: string
  name: string
  slug: string
}

export type CommunityPublic = CommunityRecord & {
  member_count: number
  categories: CategoryPublic[]
}
