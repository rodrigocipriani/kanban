import Usecase from '@/backend/models/Usecase'
import Column from '@/shared/entities/Column'
import User from '@/shared/entities/User'
import ColumnRepository from './ColumnRepository'

export type UpdateColumnUsecaseRequest = {
  id: Column['id']
  title: Column['title']
  order?: Column['order']
  authUserId: User['id']
}

export type UpdateColumnUsecaseResponse = {
  success: boolean
}

export default class UpdateColumnUsecase extends Usecase<
  UpdateColumnUsecaseRequest,
  UpdateColumnUsecaseResponse
> {
  private readonly columnRepository: ColumnRepository

  constructor({
    columnRepository,
  }: { columnRepository?: ColumnRepository } = {}) {
    super()
    this.columnRepository = columnRepository || new ColumnRepository()
  }

  async execute(
    params: UpdateColumnUsecaseRequest
  ): Promise<UpdateColumnUsecaseResponse> {
    const { id, title, order, authUserId } = params

    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    if (!id) {
      throw Error('Column ID is required')
    }

    const result = await this.columnRepository.update({
      id,
      title: title || undefined,
      order: order || undefined,
      authUserId: authUserId,
    })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
