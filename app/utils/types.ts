/**
 * Subset: Courtesy `PrismaClient` https://prisma.io
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never
}

export type Pluck<TInterface extends {}, TType extends keyof TInterface> = TInterface[TType]

export interface VerifiedAuthPayload {
  _id: string
  account_id: string
}

export type ClientJWTPayload = { _id: string; account_id: string }
export type ServerJWTPayload = ClientJWTPayload & { email: string }
