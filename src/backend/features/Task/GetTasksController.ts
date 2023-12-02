
import Api from '@/backend/models/Api'
import { ControllerResponse } from '@/backend/models/Controller'
import PrivateController from '@/backend/models/PrivateController'
import { ResponseStatuses } from '@/backend/models/ResponseStatuses'

import { NextApi } from '@/frontend/infra/NextApi'

import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'

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
  private readonly api: Api
  private readonly useCase: GetTasksUsecase

  constructor({ useCase, api }: { useCase?: GetTasksUsecase; api?: Api } = {}) {
    super()
    this.api = api || new NextApi()

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
