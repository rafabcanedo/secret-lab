import { useQuery } from "@tanstack/react-query"
import { getCommunityBySlug } from "@/services/communities"

export function useCommunity(slug: string) {
  return useQuery({
    queryKey: ["community", slug],
    queryFn: () => getCommunityBySlug(slug),
  })
}
