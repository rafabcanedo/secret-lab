import type { Metadata } from "next"
import { PostsFeed } from "./components/posts-feed"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: slug }
}

export default async function CommunityPage({ params }: Props) {
  const { slug } = await params
  return <PostsFeed slug={slug} />
}
