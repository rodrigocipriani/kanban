import { ControllerResponse } from '@/backend/models/Controller'
import PrivateController from '@/backend/models/PrivateController'
import Column from '@/shared/entities/Column'
import { ResponseStatuses } from '@/shared/models/ResponseStatuses'


import GetColumnsUsecase from './GetColumnsUsecase'

type Request = never
type Response = {
  columns: Column[]
}

export default class GetColumnsController extends PrivateController<
  Request,
  Response
> {
  private readonly useCase: GetColumnsUsecase

  constructor({ useCase }: { useCase?: GetColumnsUsecase } = {}) {
    super()

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
