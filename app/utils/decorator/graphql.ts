import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { IGraphQLResolver } from '../../graphql/types'

type GraphQLDecorator = (
  _t: any,
  _p: string,
  descriptor: TypedPropertyDescriptor<IGraphQLResolver>
) => TypedPropertyDescriptor<IGraphQLResolver>

interface AuthorizedOptions {
  scope?: string
  message: string
}

/**
 * Adds authorization logic to a GraphQL resolver
 * @param message The error message for unauthorized requests
 */
export function Authorized({ scope, message }: AuthorizedOptions): GraphQLDecorator {
  return function (_t: any, _p: string, descriptor: TypedPropertyDescriptor<IGraphQLResolver>) {
    const method = descriptor.value

    descriptor.value = async function (_root, _args, context, _info) {
      const account = context.req.session?.account
      const auth = context.req.auth

      if (!account) {
        throw new AuthenticationError(message)
      }

      if (!auth) {
        throw new ForbiddenError(message)
      }

      if (auth.client.account_id !== account.account_id) {
        throw new ForbiddenError(`The authentication provided by client cannot be ambigous`)
      }

      const result = method?.apply(this, [_root, _args, context, _info])
      return result
    }

    return descriptor
  }
}
