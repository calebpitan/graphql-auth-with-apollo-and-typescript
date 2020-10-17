import { SALT_ROUNDS } from './constants'
import bcrypt from 'bcrypt'

export async function hashPasword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}

export async function comparePassword(password: string, hashed: string) {
  const similar = await bcrypt.compare(password, hashed)
  return similar
}
