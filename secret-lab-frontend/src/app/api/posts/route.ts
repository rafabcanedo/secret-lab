import type { NextRequest } from "next/server"
import { mockPosts } from "@/mocks/posts"

export async function GET(_req: NextRequest) {
  // const search = req.nextUrl.searchParams.toString()
  // const res = await fetch(`${process.env.BACKEND_URL}/posts${search ? `?${search}` : ""}`)
  // const data = await res.json()
  // return Response.json(data, { status: res.status })
  return Response.json({ data: mockPosts, page: 1, limit: 20, total: mockPosts.length })
}
