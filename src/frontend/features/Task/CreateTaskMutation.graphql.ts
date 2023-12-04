import { gql } from '@apollo/client'

export const CreateTaskMutation = gql`
  mutation CreateTaskMutation(
    $title: String!
    $columnId: String!
    $content: String
    $order: Int
  ) {
    createTask(
      title: $title
      columnId: $columnId
      content: $content
      order: $order
    ) {
      id
      title
      content
      order
      columnId
    }
  }
`
