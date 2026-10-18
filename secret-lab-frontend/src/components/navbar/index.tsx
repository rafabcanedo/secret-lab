import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo-secret-lab.png"
import { Button } from "@/components/ui/button"
import { Notification } from "./components/notification"
import { UserMenu } from "./components/user-menu"

export default async function Navbar() {
  const cookieStore = await cookies()
  const isAuthenticated = !!cookieStore.get("access_token")

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Secret Lab" height={32} />
          <span className="font-semibold">Secret Lab</span>
        </Link>

        {isAuthenticated && (
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="sm" render={<Link href="/" />}>
              Feed
            </Button>
            <Button variant="ghost" size="sm" render={<Link href="/communities" />}>
              Communities
            </Button>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button variant="soft" size="sm" render={<Link href="/editor/new" />}>
                Write
              </Button>
              <Notification />
              <UserMenu initials="SL" />
            </>
          ) : (
            <Button size="lg">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
