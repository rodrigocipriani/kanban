import GetTasksEndpoint from '@/frontend/infra/NextEndpoints/GetTasksEndpoint'
import Service, { ServiceResponse } from '@/frontend/models/Service'


import Task from '@/shared/entities/Task'

type GetTasksServiceRequest = never

type GetTasksServiceResponse = {
  tasks: Task[]
}

export default class GetTasksService extends Service<
  GetTasksServiceRequest,
  GetTasksServiceResponse
> {
  private readonly endpoint: GetTasksEndpoint

  constructor({ endpoint }: { endpoint?: GetTasksEndpoint } = {}) {
    super()
    this.endpoint = endpoint || new GetTasksEndpoint()
  }

  async execute(): Promise<ServiceResponse<GetTasksServiceResponse>> {
    try {
      const response = await new GetTasksEndpoint().execute()
      const tasks = response.data?.tasks || []
      return {
        data: {
          tasks,
        },
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}
