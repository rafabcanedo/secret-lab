"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { asLink } from "./utils"
import type { UserMenuProps } from "./interfaces"

export function UserMenu({ initials }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={asLink("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem render={asLink("/drafts")}>
          Drafts
        </DropdownMenuItem>
        <DropdownMenuItem render={asLink("/bookmarks")}>
          Bookmarks
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
