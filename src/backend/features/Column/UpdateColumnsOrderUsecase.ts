import Usecase from '@/backend/models/Usecase'
import { ColumnOrderUpdateParamDTO } from '@/frontend/features/Column/ColumnOrderUpdateParamDTO'
import User from '@/shared/entities/User'
import ColumnRepository from './ColumnRepository'

export type UpdateColumnsOrderUsecaseRequest = {
  columns: ColumnOrderUpdateParamDTO[]
  authUserId: User['id']
}

export type UpdateColumnsOrderUsecaseResponse = {
  success: boolean
}

export default class UpdateColumnsOrderUsecase extends Usecase<
  UpdateColumnsOrderUsecaseRequest,
  UpdateColumnsOrderUsecaseResponse
> {
  private readonly columnRepository: ColumnRepository

  constructor({
    columnRepository,
  }: { columnRepository?: ColumnRepository } = {}) {
    super()
    this.columnRepository = columnRepository || new ColumnRepository()
  }

  async execute({
    columns,
    authUserId,
  }: UpdateColumnsOrderUsecaseRequest): Promise<UpdateColumnsOrderUsecaseResponse> {
    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    columns.forEach((column) => {
      if (!column.id) {
        throw Error('Column ID is required on each column')
      }

      if (!column.order) {
        throw Error('Column order is required on each column')
      }
    })

    const result = await this.columnRepository.updateColumnsOrder({
      columns,
      authUserId: authUserId,
    })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
