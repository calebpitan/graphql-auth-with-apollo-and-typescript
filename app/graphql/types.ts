import { Db } from 'mongodb'
import { Request, Response } from 'express'
import { GraphQLFieldResolver } from 'graphql'

type GQLFieldResolver<TArgs = any> = GraphQLFieldResolver<TArgs, Context, any>

export type IGraphQLResolver<TArgs = any, TReturn = ReturnType<GQLFieldResolver>> = (
  ...args: Parameters<GQLFieldResolver<TArgs>>
) => Promise<TReturn>

export interface Context {
  req: Request
  res: Response
  connection: any
  db: Db
}
