import type { LucideIcon } from "lucide-react"

export interface SelectOption {
  value: string
  label: string
  icon?: LucideIcon
}

export interface FormSelectProps {
  name: string
  label: string
  placeholder?: string
  options: SelectOption[]
  groupLabel?: string
}
