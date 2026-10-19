import { randomBytes } from "crypto"

function toKebabCase(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function generateSlug(text: string, hashLength = 6): string {
  const base = toKebabCase(text)
  const hash = randomBytes(Math.ceil(hashLength / 2)).toString("hex").slice(0, hashLength)
  return `${base}-${hash}`
}
