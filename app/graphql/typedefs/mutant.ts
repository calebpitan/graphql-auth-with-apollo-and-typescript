import { gql } from 'apollo-server-express'

const Mutatants = gql`
  type LoginMutant {
    token: String!
    user: User
  }

  type CreateUserMutant {
    token: String!
    user: User
  }

  type UpdateUserMutant {
    user: User
  }
`

export default Mutatants
