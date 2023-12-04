import GetAuthUserUsecase from '@/backend/features/User/GetAuthUserUsecase'
import AuthUser from '@/shared/entities/AuthUser'
import { Controller, ControllerResponse } from './Controller'

export default abstract class PrivateController<
  TRequest,
  TResponse,
> extends Controller<TRequest, TResponse> {
  protected authUser: AuthUser | undefined

  constructor() {
    super()
  }

  public async execute(request?: TRequest) {
    try {
      const response = await new GetAuthUserUsecase().execute()
      const authUser = response.user

      if (!authUser) {
        throw new Error('User is not logged in')
      }

      this.authUser = authUser

      return this.executeImpl(request)
    } catch (error) {
      return this.handleError(error)
    }
  }

  protected abstract executeImpl(
    request?: TRequest
  ): Promise<ControllerResponse<TResponse>>
}
