import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import GetTasksEndpoint from '@/frontend/infra/NextEndpoints/GetTasksEndpoint'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'

type GetAllColumnsWithTasksRequest = never

type GetAllColumnsWithTasksResponse = {
  columns: Column[]
  tasks: Task[]
}

export default class GetAllColumnsWithTasksService extends Service<
  GetAllColumnsWithTasksRequest,
  GetAllColumnsWithTasksResponse
> {
  private readonly endpoint: GetTasksEndpoint

  constructor({ endpoint }: { endpoint?: GetTasksEndpoint } = {}) {
    super()
    this.endpoint = endpoint || new GetTasksEndpoint()
  }

  async execute(): Promise<ServiceResponse<GetAllColumnsWithTasksResponse>> {
    try {
      const result = await apolloClient.query({
        query: GetAllColumnsAndTasksQuery,
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
