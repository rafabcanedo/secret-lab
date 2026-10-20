import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.toString()
  const res = await fetch(`${process.env.BACKEND_URL}/posts${search ? `?${search}` : ""}`)
  const data = await res.json()
  return Response.json(data, { status: res.status })
}
