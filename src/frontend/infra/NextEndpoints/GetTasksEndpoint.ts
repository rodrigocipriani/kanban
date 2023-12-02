import Endpoint, { EndpointResponse } from '@/models/Endpoint'
import { NextApi } from '../NextApi'
import Task from '@/models/Task'

type GetTasksEndpointRequest = never

type GetTasksEndpointResponse = {
  tasks: Task[]
}

export default class GetTasksEndpoint extends Endpoint<
  GetTasksEndpointRequest,
  GetTasksEndpointResponse
> {
  private readonly path = '/tasks'

  constructor() {
    super({ api: new NextApi() })
  }

  public async execute(): Promise<EndpointResponse<GetTasksEndpointResponse>> {
    try {
      return await this.api.get<GetTasksEndpointResponse>(this.path)
    } catch (error) {
      return this.handleError(error)
    }
  }
}
