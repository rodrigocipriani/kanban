import appPrismaClient, {
  AppPrismaClient,
} from '@/backend/infra/appPrismaClient'
import Repository from '@/backend/models/Repository'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import User from '@/shared/entities/User'

export default class TaskRepository extends Repository<AppPrismaClient> {
  constructor({ client }: { client?: AppPrismaClient } = {}) {
    super({ client: client || appPrismaClient })
  }

  async findAll({
    columnId,
    authUserId,
  }: {
    columnId: Column['id']
    authUserId: User['id']
  }): Promise<Task[]> {
    const tasks = await this.client.task.findMany({
      where: { createdByUserId: authUserId, columnId },
    })

    return tasks.map((task) => new Task(task as Task))
  }

  async findById({ id }: { id: string }): Promise<Task | null> {
    const task = await this.client.task.findUnique({
      where: { id },
    })
    return task ? new Task(task as Task) : null
  }

  async create({
    task,
    authUserId,
  }: {
    task: Task
    authUserId: User['id']
  }): Promise<Task | null> {
    const newTask = await this.client.task.create({
      data: {
        ...task,
        createdByUserId: authUserId,
      },
    })
    return new Task(newTask as Task)
  }

  async update(id: string, data: Partial<Task>): Promise<Task | null> {
    const task = await this.client.task.update({
      where: { id },
      data,
    })
    return new Task(task as Task)
  }

  async delete(id: string): Promise<Task | null> {
    const task = await this.client.task.delete({
      where: { id },
    })
    return new Task(task as Task)
  }
}
