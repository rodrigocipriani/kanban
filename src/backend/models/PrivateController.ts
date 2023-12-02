import GetAuthUserUsecase from '@/backend/features/User/GetAuthUserUsecase'
import User from '@/shared/entities/User'
import { Controller, ControllerResponse } from './Controller'

export default abstract class PrivateController<
  TRequest,
  TResponse,
> extends Controller<TRequest, TResponse> {
  protected authUserId: User['id'] | undefined

  constructor() {
    super()
  }

  public async execute(request?: TRequest) {
    try {
      const response = await new GetAuthUserUsecase().execute()
      const authUserId = response.user?.id

      if (!authUserId) {
        throw new Error('User is not logged in')
      }

      this.authUserId = authUserId

      return this.executeImpl(request)
    } catch (error) {
      return this.handleError(error)
    }
  }

  protected abstract executeImpl(
    request?: TRequest
  ): Promise<ControllerResponse<TResponse>>
}
