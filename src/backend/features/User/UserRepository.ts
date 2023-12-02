import appPrismaClient, {
  AppPrismaClient,
} from "@/backend/infra/appPrismaClient";
import Repository from "@/models/Repository";
import User from "@/models/User";
import { User as UserModel } from "@prisma/client";

type FindByEmailParams = {
  email: User["email"];
  includePassword?: boolean;
};

export default class UserRepository extends Repository<AppPrismaClient> {
  constructor({ client }: { client?: AppPrismaClient } = {}) {
    super({ client: client || appPrismaClient });
  }

  async findByEmail({
    email,
    includePassword = false,
  }: FindByEmailParams): Promise<User | null> {
    const user = await this.client.user.findUnique({
      where: { email },
    });
    return this.createUserResponse({ user, includePassword });
  }

  async findById({
    id,
    includePassword = false,
  }: {
    id: User["id"];
    includePassword?: boolean;
  }): Promise<User | null> {
    const user = await this.client.user.findUnique({
      where: { id },
    });
    return this.createUserResponse({ user, includePassword });
  }

  async create(data: User): Promise<User | null> {
    const user = await this.client.user.create({ data });

    return this.createUserResponse({ user });
  }

  private createUserResponse({
    user,
    includePassword = false,
  }: {
    user: UserModel | null;
    includePassword?: boolean;
  }): User | null {
    if (!user) return null;
    if (includePassword) return new User(user);

    return new User({ ...user, password: "" });
  }
}
