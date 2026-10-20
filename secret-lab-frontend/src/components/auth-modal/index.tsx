"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SignInForm } from "./components/signin-form"
import { SignUpForm } from "./components/signup-form"

type AuthView = "signin" | "signup"

export function AuthModal() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<AuthView>("signin")

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) setView("signin")
  }

  return (
    <>
      <Button size="lg" onClick={() => setOpen(true)}>
        Sign in
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-sm overflow-y-auto max-h-[90dvh]">
          {view === "signin" ? (
            <SignInForm onSwitchView={() => setView("signup")} />
          ) : (
            <SignUpForm onSwitchView={() => setView("signin")} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
