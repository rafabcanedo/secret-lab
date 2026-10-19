import * as argon2 from "argon2"
import { AppError } from "../shared/errors/AppError.js"
import { userRepository } from "../repositories/users.js"
import type { CreateUserInput, UpdateUserInput } from "../validations/users.js"
import type { UserPublic, UserUpdatePayload } from "../types/users.js"

export const userService = {
  async register(data: CreateUserInput): Promise<UserPublic> {
    const emailTaken = await userRepository.findByEmail(data.email)
    if (emailTaken) throw new AppError("Email already in use", 409)

    const crmTaken = await userRepository.findByCrm(data.crm, data.uf)
    if (crmTaken) throw new AppError("CRM already registered", 409)

    const password_hash = await argon2.hash(data.password)

    return userRepository.create({
      name:      data.name,
      crm:       data.crm,
      uf:        data.uf,
      specialty: data.specialty,
      email:     data.email,
      password_hash,
    })
  },

  async getProfile(id: string): Promise<UserPublic> {
    const user = await userRepository.findById(id)
    if (!user) throw new AppError("User not found", 404)
    return user
  },

  async updateProfile(id: string, data: UpdateUserInput): Promise<UserPublic> {
    if (Object.keys(data).length === 0) throw new AppError("No fields to update", 400)

    const user = await userRepository.findById(id)
    if (!user) throw new AppError("User not found", 404)

    if (data.email !== undefined && data.email !== user.email) {
      const emailTaken = await userRepository.findByEmail(data.email)
      if (emailTaken) throw new AppError("Email already in use", 409)
    }

    const { password, ...fields } = data
    const updateData: UserUpdatePayload = {}

    if (fields.name      !== undefined) updateData.name      = fields.name
    if (fields.crm       !== undefined) updateData.crm       = fields.crm
    if (fields.uf        !== undefined) updateData.uf        = fields.uf
    if (fields.specialty !== undefined) updateData.specialty = fields.specialty
    if (fields.email     !== undefined) updateData.email     = fields.email
    if (password         !== undefined) updateData.password_hash = await argon2.hash(password)

    return userRepository.update(id, updateData)
  },

  async deleteAccount(id: string): Promise<void> {
    const user = await userRepository.findById(id)
    if (!user) throw new AppError("User not found", 404)
    await userRepository.deleteById(id)
  },
}
