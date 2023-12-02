import Api from '@/backend/models/Api'
import { ControllerResponse } from '@/backend/models/Controller'
import PrivateController from '@/backend/models/PrivateController'
import { ResponseStatuses } from '@/backend/models/ResponseStatuses'

import { NextApi } from '@/frontend/infra/NextApi'

import Column from '@/shared/entities/Column'

import GetColumnsUsecase from './GetColumnsUsecase'

type Request = never
type Response = {
  columns: Column[]
}

export default class GetColumnsController extends PrivateController<
  Request,
  Response
> {
  private readonly api: Api
  private readonly useCase: GetColumnsUsecase

  constructor({
    useCase,
    api,
  }: { useCase?: GetColumnsUsecase; api?: Api } = {}) {
    super()
    this.api = api || new NextApi()

    this.useCase = useCase || new GetColumnsUsecase()
  }

  protected async executeImpl(): Promise<ControllerResponse<Response>> {
    try {
      let data = null

      if (!this.authUserId) throw new Error('User is not logged in')

      data = await this.useCase.execute({
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
