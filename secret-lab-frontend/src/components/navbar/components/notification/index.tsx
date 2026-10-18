"use client"

import { useState } from "react"
import { Bell, BellRing } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Notification() {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
        {open ? <BellRing className="size-5" /> : <Bell className="size-5" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex h-32 items-center justify-center">
          <p className="text-sm text-muted-foreground">There isn&apos;t any notifications yet</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
