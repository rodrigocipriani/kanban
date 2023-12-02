import { User } from '@prisma/client'
import UserRepository from '@/backend/features/User/UserRepository'
import Usecase from '@/backend/models/Usecase'
import { GetUserDetailValidation } from './GetUserDetailValidation'

export type GetUserDetailUsecaseRequest = {
  id: User['id'] | null
}

export type GetUserDetailUsecaseResponse = {
  user: User
}

export default class GetUserDetailUsecase extends Usecase<
  GetUserDetailUsecaseRequest,
  GetUserDetailUsecaseResponse
> {
  private readonly userRepository: UserRepository

  constructor({ userRepository }: { userRepository?: UserRepository }) {
    super()
    this.userRepository = userRepository || new UserRepository()
  }

  async execute(
    params: GetUserDetailUsecaseRequest
  ): Promise<GetUserDetailUsecaseResponse> {
    const { id } = GetUserDetailValidation.parse(params)

    const user = await this.userRepository.findById({ id })

    if (!user) {
      throw Error('User not found')
    }

    return {
      user,
    }
  }
}
