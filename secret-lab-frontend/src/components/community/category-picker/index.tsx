"use client"

import { useFormContext, Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Category } from "@/enums"

const options = Object.values(Category).map((value) => ({
  value,
  label: value.split("_").map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(" "),
}))

export function CategoryPicker() {
  const { control, formState: { errors } } = useFormContext()

  return (
    <div className="flex flex-col gap-1.5">
      <Label>
        Categories{" "}
        <span className="font-normal text-muted-foreground">(up to 3)</span>
      </Label>
      <Controller
        control={control}
        name="categories"
        render={({ field }) => {
          const selected: string[] = field.value ?? []

          function toggle(value: string) {
            if (selected.includes(value)) {
              field.onChange(selected.filter((v) => v !== value))
            } else if (selected.length < 3) {
              field.onChange([...selected, value])
            }
          }

          return (
            <div className="flex flex-wrap gap-2">
              {options.map((opt) => {
                const isSelected = selected.includes(opt.value)
                const isDisabled = !isSelected && selected.length >= 3
                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => toggle(opt.value)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm transition-colors",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input text-muted-foreground hover:border-ring hover:text-foreground",
                      isDisabled && "pointer-events-none opacity-40"
                    )}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          )
        }}
      />
      {errors.categories && (
        <p className="text-xs text-destructive">{errors.categories.message as string}</p>
      )}
    </div>
  )
}
