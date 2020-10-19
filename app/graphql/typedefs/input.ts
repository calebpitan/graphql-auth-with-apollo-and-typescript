import { gql } from 'apollo-server-express'

const Input = gql`
  input IdentifierInput {
    username: String
    email: String
  }

  # Login Input
  input CredentialInput {
    identifier: IdentifierInput!
    password: String!
  }

  # Signup Input
  input CreateUserInput {
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    firstname: String
    lastname: String
    username: String
  }

  # Uniquely Select a User
  input UserFilterInput {
    _id: ID
    username: String
    email: String
  }

  input UserSelectFieldInput {
    _id: Boolean = false
    account_id: Boolean = false
    firstname: Boolean = false
    lastname: Boolean = false
    username: Boolean = false
    email: Boolean = false
  }

  input UserSelectInput {
    field: UserSelectFieldInput!
  }
`

export default Input
