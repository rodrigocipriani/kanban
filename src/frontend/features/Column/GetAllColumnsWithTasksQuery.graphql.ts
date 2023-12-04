import { gql } from '@apollo/client'

export const GetAllColumnsAndTasksQuery = gql`
  query GetAllColumnsAndTasksQuery {
    columns {
      id
      title
      order
    }
    tasks {
      id
      title
      content
      order
      columnId
    }
  }
`
