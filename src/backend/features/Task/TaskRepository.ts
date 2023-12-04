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
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    const tasks = await this.client.task.findMany({
      where: {
        createdByUserId: authUserId,
        columnId: columnId || undefined,
        deletedAt: null,
      },
    })

    return tasks.map((task) => new Task(task as Task))
  }

  // async findById({ id }: { id: string }): Promise<Task | null> {
  //   if (!authUserId) {
  //     throw Error('AuthUserId is required')
  //   }
  //   const task = await this.client.task.findUnique({
  //     where: { id, createdByUserId: authUserId, deletedAt: null },
  //   })
  //   return task ? new Task(task as Task) : null
  // }

  async create({
    task,
    authUserId,
  }: {
    task: Task
    authUserId: User['id']
  }): Promise<{
    success: boolean
  }> {
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    const newTask = await this.client.task.create({
      data: {
        ...task,
        createdByUserId: authUserId,
      },
    })

    console.log('newTask', newTask)

    return {
      success: !!task,
    }
  }

  // async update(id: string, data: Partial<Task>): Promise<Task | null> {
  //   if (!authUserId) {
  //     throw Error('AuthUserId is required')
  //   }
  //   const task = await this.client.task.update({
  //     where: { id, deletedAt: null },
  //     data,
  //   })
  //   return new Task(task as Task)
  // }

  async delete({
    taskId,
    authUserId,
  }: {
    taskId: Task['id']
    authUserId: User['id']
  }): Promise<{
    success: boolean
  }> {
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    const task = await this.client.task.update({
      where: { id: taskId, createdByUserId: authUserId },
      data: {
        deletedAt: new Date(),
      },
    })

    return {
      success: !!task,
    }
  }
}
