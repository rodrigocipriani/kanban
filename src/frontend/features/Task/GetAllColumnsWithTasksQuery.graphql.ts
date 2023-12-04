import { gql } from '@apollo/client'

export const GetAllColumnsWithTasksQuery = gql`
  query GetAllColumnsWithTasksQuery {
    getAllColumns {
      id
      title
      order
    }
    getAllTasks {
      id
      title
      content
      order
      columnId
    }
  }
`
