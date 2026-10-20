import type { NextRequest } from "next/server"

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const res = await fetch(`${process.env.BACKEND_URL}/communities/${slug}`)
  const data = await res.json()
  return Response.json(data, { status: res.status })
}
