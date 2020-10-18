import { gql } from 'apollo-server-express'

const Mutation = gql`
  type Mutation {
    login(credential: CredentialInput!): LoginMutant!
    createUser(user: CreateUserInput!): CreateUserMutant!
    updateUser(field: UpdateUserInput!): UpdateUserMutant!
  }
`

export default Mutation
