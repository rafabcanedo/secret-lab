import { Badge } from "@/components/ui/badge"
import type { CommunityHeaderProps } from "./types"

export function CommunityHeader({ community }: CommunityHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold">{community.name}</h1>
      {community.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {community.categories.map((cat) => (
            <Badge key={cat.id} variant="secondary">{cat.name}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}
