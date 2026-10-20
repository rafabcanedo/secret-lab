import { AppError } from "../shared/errors/AppError.js"
import { generateSlug } from "../shared/utils/slug.js"
import { postRepository } from "../repositories/posts.js"
import { communityRepository } from "../repositories/communities.js"
import { tagRepository } from "../repositories/tags.js"
import type { CreatePostInput, UpdatePostInput, FeedQueryInput } from "../validations/posts.js"
import type { PostPublic, PostFeedItem } from "../types/posts.js"

export const postService = {
  async create(data: CreatePostInput, authorId: string): Promise<PostPublic> {
    const community = await communityRepository.findById(data.community_id)
    if (!community) throw new AppError("Community not found", 404)

    const isMember = await communityRepository.findMember(data.community_id, authorId)
    if (!isMember) throw new AppError("You must be a member to post in this community", 403)

    const post = await postRepository.create({
      community_id:    data.community_id,
      author_id:       authorId,
      title:           data.title,
      content:         data.content,
      cover_image_url: data.cover_image_url ?? null,
    })

    if (data.tag_ids && data.tag_ids.length > 0) {
      const found = await tagRepository.findAllByIds(data.tag_ids)
      if (found.length !== data.tag_ids.length) throw new AppError("One or more tags not found", 400)
      await postRepository.setTags(post.id, data.tag_ids)
    }

    const full = await postRepository.findPublicById(post.id)
    if (!full) throw new Error("Post not found after creation")
    return full
  },

  async update(id: string, data: UpdatePostInput, userId: string): Promise<PostPublic> {
    if (Object.keys(data).length === 0) throw new AppError("No fields to update", 400)

    const post = await postRepository.findById(id)
    if (!post) throw new AppError("Post not found", 404)
    if (post.author_id !== userId) throw new AppError("Forbidden", 403)

    const { tag_ids, ...fields } = data
    await postRepository.update(id, fields)

    if (tag_ids !== undefined) {
      if (tag_ids.length > 0) {
        const found = await tagRepository.findAllByIds(tag_ids)
        if (found.length !== tag_ids.length) throw new AppError("One or more tags not found", 400)
      }
      await postRepository.setTags(id, tag_ids)
    }

    const full = await postRepository.findPublicById(id)
    if (!full) throw new AppError("Post not found after update", 404)
    return full
  },

  async publish(id: string, userId: string): Promise<PostPublic> {
    const post = await postRepository.findById(id)
    if (!post) throw new AppError("Post not found", 404)
    if (post.author_id !== userId) throw new AppError("Forbidden", 403)
    if (post.status === "PUBLISHED") throw new AppError("Post is already published", 400)

    let slug = generateSlug(post.title)
    while (await postRepository.existsBySlug(slug)) {
      slug = generateSlug(post.title)
    }

    await postRepository.update(id, {
      slug,
      status:       "PUBLISHED",
      published_at: new Date(),
    })

    const full = await postRepository.findBySlug(slug)
    if (!full) throw new AppError("Post not found after publish", 404)
    return full
  },

  async delete(id: string, userId: string): Promise<void> {
    const post = await postRepository.findById(id)
    if (!post) throw new AppError("Post not found", 404)
    if (post.author_id !== userId) throw new AppError("Forbidden", 403)
    await postRepository.deleteById(id)
  },

  async getFeed(query: FeedQueryInput): Promise<PostFeedItem[]> {
    return postRepository.findFeed(
      { community_id: query.community_id, tag_id: query.tag_id },
      query.sort ?? "recent",
      { page: query.page ?? 1, limit: query.limit ?? 20 },
    )
  },

  async getBySlug(slug: string): Promise<PostPublic> {
    const post = await postRepository.findBySlug(slug)
    if (!post) throw new AppError("Post not found", 404)
    return post
  },
}
