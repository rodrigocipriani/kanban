import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'
import { gql } from '@apollo/client'

import Task from '@/shared/entities/Task'

type DeleteTaskRequest = {
  taskId: Task['id']
}

type DeleteTaskResponse = {
  success: boolean
}

export default class DeleteTaskService extends Service<
  DeleteTaskRequest,
  DeleteTaskResponse
> {
  constructor() {
    super()
  }

  async execute({
    taskId,
  }: DeleteTaskRequest): Promise<ServiceResponse<DeleteTaskResponse>> {
    try {
      const result = await apolloClient.mutate<{
        deleteTask: DeleteTaskResponse
      }>({
        mutation: DeleteTaskMutation,
        variables: { taskId },
      })

      return {
        data: result.data?.deleteTask,
        messages: [
          {
            type: 'success',
            message: 'Task deleted successfully',
          },
        ],
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

const DeleteTaskMutation = gql`
  mutation DeleteTaskMutation($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      success
    }
  }
`
