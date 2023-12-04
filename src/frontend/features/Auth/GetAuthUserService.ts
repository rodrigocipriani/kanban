import { getServerSession } from 'next-auth'
import GetAuthUserEndpoint from '@/frontend/infra/NextEndpoints/GetAuthUserEndpoint'
import Service, { ServiceResponse } from '@/frontend/models/Service'
import { authOptions } from '@/shared/config/authOptions'
import User from '@/shared/entities/User'

type GetAuthUserServiceRequest = never

type GetAuthUserServiceResponse = {
  user: User
}

export default class GetAuthUserService extends Service<
  GetAuthUserServiceRequest,
  GetAuthUserServiceResponse
> {
  private readonly endpoint: GetAuthUserEndpoint

  constructor({ endpoint }: { endpoint?: GetAuthUserEndpoint } = {}) {
    super()
    this.endpoint = endpoint || new GetAuthUserEndpoint()
  }

  async execute(): Promise<ServiceResponse<GetAuthUserServiceResponse>> {
    try {
      const session = await getServerSession(authOptions)
      const user = session?.user as User
      return {
        data: {
          user,
        },
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}
