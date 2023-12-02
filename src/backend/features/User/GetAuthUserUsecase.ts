import Usecase from '@/backend/models/Usecase'
import { authOptions } from '@/shared/Auth/authOptions'
import User from '@/shared/entities/User'
import { getServerSession } from 'next-auth'

type GetAuthUserUsecaseRequest = never

type GetAuthUserUsecaseResponse = {
  user: User
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
    const user = session?.user as User

    if (!user) throw new Error('User is not logged in')

    return {
      user,
    }
  }
}
