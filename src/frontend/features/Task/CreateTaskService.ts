import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Task from '@/shared/entities/Task'

type CreateTaskRequest = {
  task: Task
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
    task,
  }: CreateTaskRequest): Promise<ServiceResponse<CreateTaskResponse>> {
    try {
      const result = await apolloClient.mutate<{
        createTask: CreateTaskResponse
      }>({
        mutation: CreateTaskMutation,
        variables: task,
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
      success
    }
  }
`
