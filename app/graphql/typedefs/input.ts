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
    _id: Boolean = true
    firstname: Boolean = true
    lastname: Boolean = true
    username: Boolean = true
    email: Boolean = true
  }

  input UserSelectInput {
    fields: UserSelectFieldInput!
  }
`

export default Input
