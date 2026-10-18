import { NextRequest, NextResponse } from "next/server"

const PROTECTED_ROUTES = [
  "/communities",
  "/editor",
  "/drafts",
  "/notifications",
  "/bookmarks",
  "/profile",
]

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")
  const isProtected = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
}
