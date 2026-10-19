import { and, eq } from "drizzle-orm"
import { db } from "../db/index.js"
import { users } from "../db/schema/users.js"
import type { UserPublic, UserUpdatePayload } from "../types/users.js"

const publicColumns = {
  id:         users.id,
  name:       users.name,
  crm:        users.crm,
  uf:         users.uf,
  specialty:  users.specialty,
  email:      users.email,
  created_at: users.created_at,
  updated_at: users.updated_at,
}

export const userRepository = {
  async findById(id: string): Promise<UserPublic | undefined> {
    const [user] = await db.select(publicColumns).from(users).where(eq(users.id, id)).limit(1)
    return user
  },

  async findByEmail(email: string): Promise<UserPublic | undefined> {
    const [user] = await db.select(publicColumns).from(users).where(eq(users.email, email)).limit(1)
    return user
  },

  async findByCrm(crm: string, uf: string): Promise<UserPublic | undefined> {
    const [user] = await db
      .select(publicColumns)
      .from(users)
      .where(and(eq(users.crm, crm), eq(users.uf, uf)))
      .limit(1)
    return user
  },

  async findCredentials(email: string): Promise<{ id: string; password_hash: string } | undefined> {
    const [row] = await db
      .select({ id: users.id, password_hash: users.password_hash })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    return row
  },

  async create(data: typeof users.$inferInsert): Promise<UserPublic> {
    const [user] = await db.insert(users).values(data).returning(publicColumns)
    if (!user) throw new Error("Insert returned no rows")
    return user
  },

  async update(id: string, data: UserUpdatePayload): Promise<UserPublic> {
    const [user] = await db
      .update(users)
      .set({ ...data, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning(publicColumns)
    if (!user) throw new Error("Update returned no rows")
    return user
  },

  async deleteById(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id))
  },
}
