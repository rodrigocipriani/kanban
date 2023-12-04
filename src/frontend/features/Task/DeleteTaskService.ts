import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import GetTasksEndpoint from '@/frontend/infra/NextEndpoints/GetTasksEndpoint'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'

type DeleteTaskRequest = {
  task: Task
}

type DeleteTaskResponse = {
  columns: Column[]
  tasks: Task[]
}

export default class DeleteTaskService extends Service<
  DeleteTaskRequest,
  DeleteTaskResponse
> {
  private readonly endpoint: GetTasksEndpoint

  constructor({ endpoint }: { endpoint?: GetTasksEndpoint } = {}) {
    super()
    this.endpoint = endpoint || new GetTasksEndpoint()
  }

  async execute({
    task,
  }: DeleteTaskRequest): Promise<ServiceResponse<DeleteTaskResponse>> {
    try {
      const result = await apolloClient.mutate({
        mutation: DeleteTaskMutation,
        variables: task,
      })

      return {
        data: {
          columns: result.data.columns || [],
          tasks: result.data.tasks || [],
        },
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

const DeleteTaskMutation = gql`
  mutation DeleteTaskMutation(
    $title: String!
    $columnId: String!
    $content: String
    $order: Int
  ) {
    DeleteTask(
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
