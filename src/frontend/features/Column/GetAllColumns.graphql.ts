import { gql } from '@apollo/client'

export const GetAllColumns = gql`
  query GetAllColumns {
    getAllColumns {
      id
      title
      order
    }
  }
`
