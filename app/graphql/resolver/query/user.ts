import { UserModel } from '../../../model'
import { Context } from '../../types'
import { Filter, Select, UserFilterInput, UserSelectFieldInput } from '../types'

class UserQueryResolver {
  static async user(root: any, args: Filter<UserFilterInput>, context: Context) {
    const user = await UserModel.findOne(args.filter)
    return user
  }

  static async currentUser(root: any, args: Select<UserSelectFieldInput>, context: Context) {
    return await Promise.resolve({
      username: 'caleb',
    })
  }
}

export default UserQueryResolver
