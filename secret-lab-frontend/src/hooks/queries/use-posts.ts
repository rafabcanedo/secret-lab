import { useQuery } from "@tanstack/react-query"
import { getPosts } from "@/services/posts"
import type { PostFeedParams } from "@/services/posts"

export function usePosts(params: PostFeedParams = {}, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
    enabled: options?.enabled ?? true,
  })
}
