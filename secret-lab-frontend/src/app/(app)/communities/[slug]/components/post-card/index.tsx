import Image from "next/image"
import Link from "next/link"
import { Heart, Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PostCardProps } from "./types"

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/post/${post.slug}`}>
        {post.coverImageUrl && (
          <div className="relative aspect-video w-full">
            <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <CardContent className="flex flex-col gap-2 p-4">
          <h3 className="font-semibold leading-snug">{post.title}</h3>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">{tag.name}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Link>
      <div className="flex items-center justify-end gap-3 px-4 pb-4">
        <button
          type="button"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Heart className="size-4" />
          <span className="text-xs">{post.likesCount}</span>
        </button>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bookmark className="size-4" />
        </button>
      </div>
    </Card>
  )
}
