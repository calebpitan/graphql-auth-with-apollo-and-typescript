import { QueryType } from '../types'
import UserResolver from './user'

const Query: QueryType = {
  user: UserResolver.user,
  currentUser: UserResolver.currentUser,
}

export default Query
