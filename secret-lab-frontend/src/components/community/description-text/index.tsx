"use client"

import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function CommunityDescriptionText() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="description">Description</Label>
      <textarea
        id="description"
        rows={4}
        aria-invalid={!!errors.description}
        className={cn(
          "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base resize-none transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30"
        )}
        placeholder="What is this community about?"
        {...register("description")}
      />
      {errors.description && (
        <p className="text-xs text-destructive">{errors.description.message as string}</p>
      )}
    </div>
  )
}
