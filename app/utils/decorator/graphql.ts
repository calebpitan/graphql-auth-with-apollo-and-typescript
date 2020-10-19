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
export function Authorized({ message }: AuthorizedOptions): GraphQLDecorator {
  return function (_t: any, _p: string, descriptor: TypedPropertyDescriptor<IGraphQLResolver>) {
    const method = descriptor.value

    descriptor.value = async function (_root, _args, context, _info) {
      const account = context.req.session?.account
      const auth = context.req.auth

      if (!account) {
        throw new AuthenticationError(message)
      } else if (!auth) {
        throw new ForbiddenError(message)
      } else if (auth.client.account_id !== account.account_id) {
        throw new ForbiddenError(`The authentication provided by client cannot be ambigous`)
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await method?.apply(this, [_root, _args, context, _info])
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result
    }

    return descriptor
  }
}
