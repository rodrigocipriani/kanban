import appPrismaClient, {
  AppPrismaClient,
} from '@/backend/infra/appPrismaClient'
import Repository from '@/backend/models/Repository'
import Column from '@/shared/entities/Column'
import User from '@/shared/entities/User'

export default class ColumnRepository extends Repository<AppPrismaClient> {
  constructor({ client }: { client?: AppPrismaClient } = {}) {
    super({ client: client || appPrismaClient })
  }

  async findAll({ authUserId }: { authUserId: User['id'] }): Promise<Column[]> {
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    const columns = await this.client.column.findMany({
      where: {
        createdByUserId: authUserId,
        deletedAt: null,
      },
    })

    return columns.map((column) => new Column(column as Column))
  }

  async create({
    column,
    authUserId,
  }: {
    column: Column
    authUserId: User['id']
  }): Promise<{
    success: boolean
  }> {
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    const newColumn = await this.client.column.create({
      data: {
        ...column,
        createdByUserId: authUserId,
      },
    })

    return {
      success: !!column,
    }
  }

  async update({
    id,
    title,
    order,
    authUserId,
  }: {
    id: Column['id']
    title?: Column['title']
    order?: Column['order']
    authUserId: User['id']
  }): Promise<{
    success: boolean
  }> {
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    const updatedColumn = await this.client.column.update({
      where: { id, createdByUserId: authUserId },
      data: {
        title,
        order,
      },
    })

    return {
      success: !!updatedColumn,
    }
  }

  async delete({
    columnId,
    authUserId,
  }: {
    columnId: Column['id']
    authUserId: User['id']
  }): Promise<{
    success: boolean
  }> {
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    const column = await this.client.column.update({
      where: { id: columnId, createdByUserId: authUserId },
      data: {
        deletedAt: new Date(),
      },
    })

    return {
      success: !!column,
    }
  }
}
