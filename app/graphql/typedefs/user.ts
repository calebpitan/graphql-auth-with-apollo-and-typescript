import { gql } from 'apollo-server-express'

const User = gql`
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
  }
`

export default User
