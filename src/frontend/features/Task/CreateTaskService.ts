import { makeApolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import GetTasksEndpoint from '@/frontend/infra/NextEndpoints/GetTasksEndpoint'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { CreateTaskMutation } from './CreateTaskMutation.graphql'

type CreateTaskRequest = {
  task: Task
}

type CreateTaskResponse = {
  columns: Column[]
  tasks: Task[]
}

export default class CreateTaskService extends Service<
  CreateTaskRequest,
  CreateTaskResponse
> {
  private readonly endpoint: GetTasksEndpoint

  constructor({ endpoint }: { endpoint?: GetTasksEndpoint } = {}) {
    super()
    this.endpoint = endpoint || new GetTasksEndpoint()
  }

  async execute({
    task,
  }: CreateTaskRequest): Promise<ServiceResponse<CreateTaskResponse>> {
    try {
      const result = await makeApolloClient().mutate({
        mutation: CreateTaskMutation,
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
