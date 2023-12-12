import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Task from '@/shared/entities/Task'

type CreateTaskRequest = {
  id?: Task['id']
  title: Task['title']
  columnId: Task['columnId']
  content?: Task['content']
  order?: Task['order']
}

type CreateTaskResponse = {
  success: boolean
}

export default class CreateTaskService extends Service<
  CreateTaskRequest,
  CreateTaskResponse
> {
  constructor() {
    super()
  }

  async execute({
    id,
    title,
    columnId,
    content,
    order,
  }: CreateTaskRequest): Promise<ServiceResponse<CreateTaskResponse>> {
    try {
      const result = await apolloClient.mutate<{
        createTask: CreateTaskResponse
      }>({
        mutation: CreateTaskMutation,
        variables: {
          id,
          title,
          columnId,
          content,
          order,
        },
      })
      return {
        data: {
          success: result.data?.createTask.success || false,
        },
        messages: [
          {
            type: 'success',
            message: 'Task created successfully',
          },
        ],
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

const CreateTaskMutation = gql`
  mutation CreateTaskMutation(
    $id: ID
    $title: String!
    $columnId: String!
    $content: String
    $order: String
  ) {
    createTask(
      id: $id
      title: $title
      columnId: $columnId
      content: $content
      order: $order
    ) {
      success
    }
  }
`
