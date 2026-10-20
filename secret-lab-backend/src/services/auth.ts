import * as argon2 from "argon2"
import { AppError } from "../shared/errors/AppError.js"
import { userRepository } from "../repositories/users.js"
import type { UserPublic } from "../types/users.js"

export const authService = {
  async login(email: string, password: string): Promise<{ userId: string; user: UserPublic }> {
    const credentials = await userRepository.findCredentials(email)
    if (!credentials) throw new AppError("Invalid credentials", 401)

    const valid = await argon2.verify(credentials.password_hash, password)
    if (!valid) throw new AppError("Invalid credentials", 401)

    const user = await userRepository.findById(credentials.id)
    if (!user) throw new AppError("Invalid credentials", 401)

    return { userId: credentials.id, user }
  },

  async me(userId: string): Promise<UserPublic> {
    const user = await userRepository.findById(userId)
    if (!user) throw new AppError("User not found", 404)
    return user
  },
}
