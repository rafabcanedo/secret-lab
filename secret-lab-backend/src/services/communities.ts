import { AppError } from "../shared/errors/AppError.js"
import { generateSlug } from "../shared/utils/slug.js"
import { communityRepository } from "../repositories/communities.js"
import { categoryRepository } from "../repositories/categories.js"
import type { CreateCommunityInput } from "../validations/communities.js"
import type { CommunityPublic } from "../types/communities.js"

export const communityService = {
  async create(data: CreateCommunityInput, creatorId: string): Promise<CommunityPublic> {
    let slug = generateSlug(data.name)
    while (await communityRepository.existsBySlug(slug)) {
      slug = generateSlug(data.name)
    }

    const community = await communityRepository.create({
      creator_id:  creatorId,
      name:        data.name,
      slug,
      description: data.description ?? null,
    })

    if (data.category_ids && data.category_ids.length > 0) {
      const found = await categoryRepository.findAllByIds(data.category_ids)
      if (found.length !== data.category_ids.length) throw new AppError("One or more categories not found", 400)
      await communityRepository.addCategories(community.id, data.category_ids)
    }

    await communityRepository.addMember(community.id, creatorId)

    const full = await communityRepository.findBySlug(slug)
    if (!full) throw new Error("Community not found after creation")
    return full
  },

  async list(): Promise<CommunityPublic[]> {
    return communityRepository.findAll()
  },

  async getBySlug(slug: string): Promise<CommunityPublic> {
    const community = await communityRepository.findBySlug(slug)
    if (!community) throw new AppError("Community not found", 404)
    return community
  },

  async join(communityId: string, userId: string): Promise<void> {
    const community = await communityRepository.findById(communityId)
    if (!community) throw new AppError("Community not found", 404)

    const isMember = await communityRepository.findMember(communityId, userId)
    if (isMember) throw new AppError("Already a member", 409)

    await communityRepository.addMember(communityId, userId)
  },

  async leave(communityId: string, userId: string): Promise<void> {
    const community = await communityRepository.findById(communityId)
    if (!community) throw new AppError("Community not found", 404)

    const isMember = await communityRepository.findMember(communityId, userId)
    if (!isMember) throw new AppError("Not a member", 404)

    await communityRepository.removeMember(communityId, userId)
  },
}
