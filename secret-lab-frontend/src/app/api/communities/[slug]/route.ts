import type { NextRequest } from "next/server"
import { mockCommunities } from "@/mocks/communities"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // const res = await fetch(`${process.env.BACKEND_URL}/communities/${slug}`)
  // const data = await res.json()
  // return Response.json(data, { status: res.status })
  const community = mockCommunities.find((c) => c.slug === slug)
  if (!community) return Response.json({ message: "Not found" }, { status: 404 })
  return Response.json(community)
}
