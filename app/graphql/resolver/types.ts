import { IGraphQLResolver } from '../types'

export type Filter<T> = { filter: T }
export type Select<T> = { select: { field: T } }

export interface QueryType {
  user: IGraphQLResolver<Filter<UserFilterInput>, Partial<User | null>>
  currentUser: IGraphQLResolver<Select<UserSelectFieldInput>, Partial<User>>
}

export interface User {
  _id: string | number
  firstname: string
  lastname: string
  username: string
  email: string
}

export interface UserFilterInput {
  _id?: string
  username?: string
  email?: string
}

export interface UserSelectFieldInput {
  _id?: boolean
  firstname?: boolean
  lastname?: boolean
  username?: boolean
  email?: boolean
}

export interface IdentifierInput {
  username: string
  email: string
}

export interface CredentialInput {
  identifier: IdentifierInput
  password: string
}

export interface CreateUserInput {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
}

export interface UpdateUserInput {
  firstname: string
  lastname: string
  username: string
}

export interface UpdateUserResolverInput {
  field: UpdateUserInput
}

export interface CreateUserResolverInput {
  user: CreateUserInput
}

export interface LoginResolverInput {
  credential: CredentialInput
}
