"use client"

import { useCommunity } from "@/hooks/queries/use-community"
import { usePosts } from "@/hooks/queries/use-posts"
import { CommunityHeader } from "../community-header"
import { PostCard } from "../post-card"
import type { PostsFeedProps } from "./types"

export function PostsFeed({ slug }: PostsFeedProps) {
  const { data: community, isLoading: communityLoading } = useCommunity(slug)
  const { data: postsData, isLoading: postsLoading } = usePosts(
    { communityId: community?.id },
    { enabled: !!community?.id }
  )

  if (communityLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!community) {
    return <div className="container mx-auto px-4 py-8">Community not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
      <CommunityHeader community={community} />
      <div className="grid grid-cols-2 gap-6">
        {postsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-muted animate-pulse" />
            ))
          : postsData?.data.map((post) => <PostCard key={post.id} post={post} />)
        }
      </div>
    </div>
  )
}
