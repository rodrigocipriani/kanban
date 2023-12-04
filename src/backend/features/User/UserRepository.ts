import { User as UserModel } from '@prisma/client'
import appPrismaClient, {
  AppPrismaClient,
} from '@/backend/infra/appPrismaClient'
import Repository from '@/backend/models/Repository'
import User from '@/shared/entities/User'

type FindByEmailParams = {
  email: User['email']
  includePassword?: boolean
}

// TODO - should be implemented some secure to prevent data leak
export default class UserRepository extends Repository<AppPrismaClient> {
  constructor({ client }: { client?: AppPrismaClient } = {}) {
    super({ client: client || appPrismaClient })
  }

  async findAll(): Promise<User[]> {
    const users = await this.client.user.findMany({})

    return users.map((user) => new User(user))
  }

  async findByEmail({
    email,
    includePassword = false,
  }: FindByEmailParams): Promise<User | null> {
    const user = await this.client.user.findUnique({
      where: { email },
    })
    return this.createUserResponse({ user, includePassword })
  }

  async findById({
    id,
    includePassword = false,
  }: {
    id: User['id']
    includePassword?: boolean
  }): Promise<User | null> {
    const user = await this.client.user.findUnique({
      where: { id },
    })
    return this.createUserResponse({ user, includePassword })
  }

  async create(data: User): Promise<User | null> {
    const user = await this.client.user.create({ data })

    return this.createUserResponse({ user })
  }

  private createUserResponse({
    user,
    includePassword = false,
  }: {
    user: UserModel | null
    includePassword?: boolean
  }): User | null {
    if (!user) return null
    if (includePassword) return new User(user)

    return new User({ ...user, password: '' })
  }
}
