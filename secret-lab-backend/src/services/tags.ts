import { AppError } from "../shared/errors/AppError.js"
import { toKebabCase } from "../shared/utils/slug.js"
import { tagRepository } from "../repositories/tags.js"
import type { TagRecord } from "../types/tags.js"

export const tagService = {
  async create(name: string): Promise<TagRecord> {
    const slug = toKebabCase(name)
    const existing = await tagRepository.findBySlug(slug)
    if (existing) throw new AppError("Tag already exists", 409)
    return tagRepository.create({ name, slug })
  },

  async list(): Promise<TagRecord[]> {
    return tagRepository.findAll()
  },
}
