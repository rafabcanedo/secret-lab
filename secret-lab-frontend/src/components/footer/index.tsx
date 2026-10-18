import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo-secret-lab.png"

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 text-center">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Secret Lab" height={28} />
          <span className="font-semibold">Secret Lab</span>
        </div>
        <p className="text-sm text-muted-foreground">The closed space for physicians</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Secret Lab. All rights reserved.</p>
      </div>
    </footer>
  )
}
