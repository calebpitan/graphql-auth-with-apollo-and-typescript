import { UserInputError } from 'apollo-server-express'
import { UserModel } from '../../../model'
import { comparePassword, createToken, hashPasword, payloadFromUser } from '../../../utils/auth'
import { Context } from '../../types'
import {
  CreateUserResolverInput,
  LoginResolverInput,
  IdentifierInput,
  UpdateUserResolverInput,
} from '../types'
import { createBadInput, createSession } from '../../../utils/index'
import { CLIENT_TOKEN_EXPIRY } from '../../../utils/constants'
import { nanoid } from 'nanoid'
import { Authorized } from '../../../utils/decorator/graphql'
import { GraphQLResolveInfo } from 'graphql'

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

    const user = await UserModel.findOne(getOneOfIdentifier({ username, email })).exec()

    if (!user) {
      throw new UserInputError(
        `Could not associate any user with the given identifier`,
        createBadInput({ username, email })
      )
    }

    const canAuth = await comparePassword(password, user.password)

    if (!canAuth) {
      throw new UserInputError('Password is incorrect', createBadInput({ password }))
    }

    const [clientPayload, serverPayload] = payloadFromUser({
      _id: user._id,
      account_id: user.account_id,
      email: user.email,
    })

    const clientToken = await createToken(clientPayload, CLIENT_TOKEN_EXPIRY)

    createSession(context.req, { account: serverPayload })

    return { user, token: clientToken }
  }

  static async createUser(_root: any, args: CreateUserResolverInput, context: Context) {
    const { password, username, email, ...rest } = args.user

    const userExists = await UserModel.exists({ $or: [{ username }, { email }] })

    if (userExists) {
      throw new UserInputError(
        `There is an existing user with the username or email`,
        createBadInput({ username, email })
      )
    }

    const user = await UserModel.create({
      username,
      email,
      account_id: nanoid(),
      password: await hashPasword(password),
      ...rest,
    })

    const [clientPayload, serverPayload] = payloadFromUser({
      _id: user._id,
      account_id: user.account_id,
      email: user.email,
    })

    const clientToken = await createToken(clientPayload, CLIENT_TOKEN_EXPIRY)

    createSession(context.req, { account: serverPayload })

    return { user, token: clientToken }
  }

  // This resolver can only handle updating basic data that don't need any verification
  // To update data like email, password, and other sensitive ones, a different resolver
  // should be used for each and should implement a proper verififcation logic like
  // sending email or mobile message alert containing a short-term link to complete
  // the transaction.
  @Authorized({ message: `You are not authenticated` })
  static async updateUser(
    _root: any,
    args: UpdateUserResolverInput,
    context: Context,
    _info: GraphQLResolveInfo
  ) {
    const auth = context.req.auth
    const { username, ...rest } = args.field
    const usernameExists = await UserModel.exists({ username })

    if (usernameExists) {
      throw new UserInputError(`Username is already taken`, createBadInput({ username }))
    }

    const user = await UserModel.findByIdAndUpdate(
      auth?.client._id as string,
      { username, ...rest },
      { new: true }
    )

    return { user }
  }
}

export default UserMutationResolver
