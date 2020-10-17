import { UserInputError } from 'apollo-server-express'
import { UserModel } from '../../../model'
import { comparePassword, hashPasword } from '../../../utils/auth'
import { Context } from '../../types'
import { CreateUserResolverInput, LoginResolverInput, IdentifierInput } from '../types'

function getOneOfIdentifier({ username, email }: IdentifierInput) {
  if (username && typeof username !== undefined) {
    return { username }
  }

  return { email }
}

class UserMutationResolver {
  static async login(_root: any, args: LoginResolverInput, context: Context) {
    const {
      credential: {
        identifier: { username, email },
        password,
      },
    } = args

    const user = await UserModel.findOne(getOneOfIdentifier({ username, email }))

    if (!user) {
      throw new UserInputError(`Could not associate any user with the given identifier`, {
        input: {
          username,
          email,
        },
      })
    }

    const canAuth = await comparePassword(password, user.password)

    if (!canAuth) {
      throw new UserInputError('Password is incorrect', { input: { password } })
    }

    return user
  }

  static async createUser(_root: any, args: CreateUserResolverInput, context: Context) {
    const { password, ...rest } = args.user
    const user = await UserModel.create({ password: await hashPasword(password), ...rest })

    return user
  }

  static async updateUser(root: any, args: any, context: Context) {}
}

export default UserMutationResolver
