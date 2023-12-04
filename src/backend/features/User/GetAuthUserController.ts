import { ControllerResponse } from '@/backend/models/Controller'
import PrivateController from '@/backend/models/PrivateController'
import AuthUser from '@/shared/entities/AuthUser'
import { ResponseStatuses } from '@/shared/types/ResponseStatuses'

type Request = never
type Response = {
  authUser: AuthUser
}

export default class GetAuthUserController extends PrivateController<
  Request,
  Response
> {
  constructor() {
    super()
  }

  protected async executeImpl(): Promise<ControllerResponse<Response>> {
    try {
      let data = null

      if (!this.authUser) throw new Error('User is not logged in')
      return new ControllerResponse({
        data: { authUser: this.authUser },
        status: ResponseStatuses.Success,
      })
    } catch (error) {
      return this.handleError(error)
    }
  }
}
