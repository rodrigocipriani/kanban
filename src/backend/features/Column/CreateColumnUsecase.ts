import Usecase from '@/backend/models/Usecase'
import Column from '@/shared/entities/Column'
import User from '@/shared/entities/User'
import ColumnRepository from './ColumnRepository'

export type CreateColumnUsecaseRequest = {
  column: Column
  authUserId: User['id']
}

export type CreateColumnUsecaseResponse = {
  success: boolean
}

export default class CreateColumnUsecase extends Usecase<
  CreateColumnUsecaseRequest,
  CreateColumnUsecaseResponse
> {
  private readonly columnRepository: ColumnRepository

  constructor({
    columnRepository,
  }: { columnRepository?: ColumnRepository } = {}) {
    super()
    this.columnRepository = columnRepository || new ColumnRepository()
  }

  async execute(
    params: CreateColumnUsecaseRequest
  ): Promise<CreateColumnUsecaseResponse> {
    const { column, authUserId } = params

    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    if (!column) {
      throw Error('Column is required')
    }

    const result = await this.columnRepository.create({
      column: new Column(column),
      authUserId: authUserId,
    })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
