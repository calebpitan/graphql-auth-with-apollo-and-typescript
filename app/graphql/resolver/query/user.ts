import { ForbiddenError } from 'apollo-server-express'
import { UserModel } from '../../../model'
import { Context } from '../../types'
import { Filter, Select, UserFilterInput, UserSelectFieldInput } from '../types'

class UserQueryResolver {
  static async user(root: any, args: Filter<UserFilterInput>, context: Context) {
    const user = await UserModel.findOne(args.filter)
    return user
  }

  static async currentUser(_root: any, args: Select<UserSelectFieldInput>, context: Context) {
    const { auth } = context.req
    const account = context.req.session?.account

    const getSelectedFields: <T extends { [k: string]: any }>(filed: T) => string = field => {
      return (Object.keys(field) as Array<keyof typeof field>).filter(key => field[key]).join(' ')
    }

    if (auth?.client.account_id !== account?.account_id) {
      throw new ForbiddenError(`The authentication provided by client cannot be ambigous`)
    }

    const userQuery = UserModel.findById(context.req.auth?.client._id)
    const user =
      args.select && args.select.field
        ? userQuery.select(getSelectedFields(args.select.field)).exec()
        : userQuery.exec()

    return user
  }
}

export default UserQueryResolver
