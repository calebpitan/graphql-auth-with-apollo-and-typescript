import { gql } from 'apollo-server-express'

const Query = gql`
  type Query {
    user(filter: UserFilterInput!): User
    currentUser(select: UserSelectInput): User
  }
`

export default Query
