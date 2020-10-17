import UserMutationResolver from './user'

const Mutation = {
  login: UserMutationResolver.login,
  createUser: UserMutationResolver.createUser,
  updateUser: UserMutationResolver.updateUser,
}

export default Mutation
