import { ApolloError } from 'apollo-server-express'

class JWTExpiredError extends ApolloError {
  constructor(message: string, info?: Record<string, any>) {
    super(message, 'JWT_EXPIRED', info)

    Object.defineProperty(this, 'name', { value: 'JWTExpiredError' })
  }
}

export { JWTExpiredError }
