import { ApolloError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import jwt, { SignOptions, Secret } from 'jsonwebtoken'
import { JWTExpiredError } from '../errors'

import { SALT_ROUNDS, SECRET } from './constants'
import { Pluck, ClientJWTPayload, ServerJWTPayload, VerifiedAuthPayload } from './types'

export async function hashPasword(password: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}

export async function comparePassword(password: string, hashed: string) {
  const similar = await bcrypt.compare(password, hashed)
  return similar
}

export async function createToken(data: any, expiry: Pluck<SignOptions, 'expiresIn'>) {
  return await Promise.resolve(jwt.sign(data, SECRET as Secret, { expiresIn: expiry }))
}

export async function verifyToken(token: string): Promise<VerifiedAuthPayload> {
  try {
    return (await Promise.resolve(jwt.verify(token, SECRET as Secret))) as VerifiedAuthPayload
  } catch (e) {
    const { name, message, ...extensions } = e
    if (name === 'TokenExpiredError') {
      throw new JWTExpiredError(message, extensions)
    }
    throw new ApolloError(message, name)
  }
}

export function payloadFromUser({
  _id,
  account_id,
  email,
}: ServerJWTPayload): [ClientJWTPayload, ServerJWTPayload] {
  const client = { _id, account_id }
  const server = { _id, account_id, email }
  return [client, server]
}
