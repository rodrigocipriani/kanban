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
    if (!authUserId) throw new Error('User not found')

    const columns = await this.client.column.findMany({
      where: { createdByUserId: authUserId },
    })

    return columns.map((column) => new Column(column as Column))
  }

  async findById(id: string): Promise<Column | null> {
    const column = await this.client.column.findUnique({
      where: { id },
    })
    return column ? new Column(column as Column) : null
  }

  async create(data: Column): Promise<Column | null> {
    const column = await this.client.column.create({ data })
    return new Column(column as Column)
  }

  async update(id: string, data: Partial<Column>): Promise<Column | null> {
    const column = await this.client.column.update({
      where: { id },
      data,
    })
    return new Column(column as Column)
  }

  async delete(id: string): Promise<Column | null> {
    const column = await this.client.column.delete({
      where: { id },
    })
    return new Column(column as Column)
  }
}
