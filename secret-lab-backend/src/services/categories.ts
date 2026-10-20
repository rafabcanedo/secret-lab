import { AppError } from "../shared/errors/AppError.js"
import { toKebabCase } from "../shared/utils/slug.js"
import { categoryRepository } from "../repositories/categories.js"
import type { CategoryRecord } from "../types/categories.js"

export const categoryService = {
  async create(name: string): Promise<CategoryRecord> {
    const slug = toKebabCase(name)
    const existing = await categoryRepository.findBySlug(slug)
    if (existing) throw new AppError("Category already exists", 409)
    return categoryRepository.create({ name, slug })
  },

  async list(): Promise<CategoryRecord[]> {
    return categoryRepository.findAll()
  },
}
