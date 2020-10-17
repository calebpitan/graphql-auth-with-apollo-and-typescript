import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ options: { customName: 'User' } })
class UserSchema {
  @prop({ required: true })
  public firstname!: string

  @prop({ required: true })
  public lastname!: string

  @prop({ unique: true, required: true })
  public username!: string

  @prop({ unique: true, required: true })
  public email!: string

  @prop({ required: true })
  public password!: string
}

export default UserSchema
