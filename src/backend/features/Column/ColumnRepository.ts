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
    const columns = await this.client.column.findMany({
      where: { createdById: authUserId },
    })

    return columns.map((column) => new Column(column as Column))
  }
}
