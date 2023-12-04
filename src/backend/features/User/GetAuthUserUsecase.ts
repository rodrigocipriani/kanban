import { getServerSession } from 'next-auth'
import Usecase from '@/backend/models/Usecase'
import { authOptions } from '@/shared/config/authOptions'
import AuthUser from '@/shared/entities/AuthUser'

type GetAuthUserUsecaseRequest = never

type GetAuthUserUsecaseResponse = {
  user: AuthUser
}

export default class GetAuthUserUsecase extends Usecase<
  GetAuthUserUsecaseRequest,
  GetAuthUserUsecaseResponse
> {
  constructor() {
    super()
  }

  async execute(): Promise<GetAuthUserUsecaseResponse> {
    const session = await getServerSession(authOptions)

    const user = session?.user as AuthUser

    if (!user) throw new Error('User is not logged in')

    return {
      user,
    }
  }
}
