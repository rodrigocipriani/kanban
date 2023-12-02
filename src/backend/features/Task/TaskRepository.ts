import appPrismaClient, {
  AppPrismaClient,
} from "@/backend/infra/appPrismaClient";
import Column from "@/models/Column";
import Repository from "@/models/Repository";
import Task from "@/models/Task";
import User from "@/models/User";

export default class TaskRepository extends Repository<AppPrismaClient> {
  constructor({ client }: { client?: AppPrismaClient } = {}) {
    super({ client: client || appPrismaClient });
  }

  async findAll({
    columnId,
    authUserId,
  }: {
    columnId: Column["id"];
    authUserId: User["id"];
  }): Promise<Task[]> {
    const tasks = await this.client.task.findMany({
      where: { createdById: authUserId, columnId },
    });

    return tasks.map((task) => new Task(task));
  }
}
