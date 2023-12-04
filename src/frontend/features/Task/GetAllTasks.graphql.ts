import { gql } from '@apollo/client'

export const GetAllTasks = gql`
  query GetAllTasks {
    getAllTasks {
      id
      title
      content
      order
      columnId
    }
  }
`
