import { ControllerResponse } from '@/backend/models/Controller'
import PrivateController from '@/backend/models/PrivateController'

import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { ResponseStatuses } from '@/shared/types/ResponseStatuses'

import GetTasksUsecase from './GetTasksUsecase'

type Request = {
  columnId: Column['id']
}
type Response = {
  tasks: Task[]
}

export default class GetTasksController extends PrivateController<
  Request,
  Response
> {
  private readonly useCase: GetTasksUsecase

  constructor({ useCase }: { useCase?: GetTasksUsecase } = {}) {
    super()

    this.useCase = useCase || new GetTasksUsecase()
  }

  protected async executeImpl({
    columnId,
  }: Request): Promise<ControllerResponse<Response>> {
    try {
      let data = null

      if (!this.authUserId) throw new Error('User is not logged in')

      data = await this.useCase.execute({
        columnId,
        authUserId: this.authUserId,
      })

      return new ControllerResponse({
        data,
        status: ResponseStatuses.Success,
      })
    } catch (error) {
      return this.handleError(error)
    }
  }
}
