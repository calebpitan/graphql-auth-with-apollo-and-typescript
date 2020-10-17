import { gql } from 'apollo-server-express'

const Mutation = gql`
  type Mutation {
    login(credential: CredentialInput!): User!
    createUser(user: CreateUserInput!): User!
    updateUser(fields: UpdateUserInput!): User!
  }
`

export default Mutation
