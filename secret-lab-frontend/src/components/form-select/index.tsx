"use client"

import { useFormContext, Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FormSelectProps } from "./interfaces"

export function FormSelect({ name, label, placeholder, options, groupLabel }: FormSelectProps) {
  const { control, formState: { errors } } = useFormContext()

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={name} className="w-full" aria-invalid={!!errors[name]}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {groupLabel ? (
                <SelectGroup>
                  <SelectLabel>{groupLabel}</SelectLabel>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.icon && <opt.icon className="size-4" />}
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ) : (
                options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.icon && <opt.icon className="size-4" />}
                    {opt.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && (
        <p className="text-xs text-destructive">{errors[name]?.message as string}</p>
      )}
    </div>
  )
}
