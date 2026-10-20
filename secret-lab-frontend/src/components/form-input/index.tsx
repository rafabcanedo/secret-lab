"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormInputProps } from "./types"

export function FormInput({ name, label, type = "text", placeholder, disabled }: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { register, formState: { errors } } = useFormContext()

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={type === "password" ? "pr-9" : undefined}
          aria-invalid={!!errors[name]}
          disabled={disabled}
          {...register(name)}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name]?.message as string}</p>
      )}
    </div>
  )
}
