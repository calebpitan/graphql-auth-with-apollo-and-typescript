import { getModelForClass } from '@typegoose/typegoose'
import UserSchema from './schema/user'

const UserModel = getModelForClass(UserSchema, {})

export default UserModel
