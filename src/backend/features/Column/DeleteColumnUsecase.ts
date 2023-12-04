import Usecase from '@/backend/models/Usecase'
import Column from '@/shared/entities/Column'
import User from '@/shared/entities/User'
import ColumnRepository from './ColumnRepository'

export type DeleteColumnUsecaseRequest = {
  columnId?: Column['id']
  authUserId: User['id']
}

export type DeleteColumnUsecaseResponse = {
  success: boolean
}

export default class DeleteColumnUsecase extends Usecase<
  DeleteColumnUsecaseRequest,
  DeleteColumnUsecaseResponse
> {
  private readonly columnRepository: ColumnRepository

  constructor({
    columnRepository,
  }: { columnRepository?: ColumnRepository } = {}) {
    super()
    this.columnRepository = columnRepository || new ColumnRepository()
  }

  async execute(
    params: DeleteColumnUsecaseRequest
  ): Promise<DeleteColumnUsecaseResponse> {
    const { columnId, authUserId } = params

    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    if (!columnId) {
      throw Error('Column ID is required')
    }

    // const result = await this.columnRepository.delete({ columnId, authUserId })
    const result = await this.columnRepository.delete({
      columnId,
      authUserId,
    })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
