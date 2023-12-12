import appPrismaClient, {
  AppPrismaClient,
} from '@/backend/infra/appPrismaClient'
import Repository from '@/backend/models/Repository'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import User from '@/shared/entities/User'
import { produceOrder } from '@/shared/types/Order'

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

  async create({
    id,
    title,
    columnId,
    content,
    order,
    authUserId,
  }: {
    id?: Task['id']
    title: Task['title']
    columnId: Task['columnId']
    content?: Task['content']
    order?: Task['order']
    authUserId: User['id']
  }): Promise<{
    success: boolean
  }> {
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    let taskOrder = order

    if (!taskOrder) {
      const lastTask = await this.client.task.findFirst({
        where: {
          createdByUserId: authUserId,
          columnId: columnId || undefined,
          deletedAt: null,
        },
        orderBy: {
          order: 'desc',
        },
      })

      taskOrder = lastTask ? produceOrder(lastTask.order) : produceOrder()
    }

    const newTask = await this.client.task.create({
      data: {
        id,
        title,
        columnId,
        content: content || undefined,
        order: taskOrder,
        createdByUserId: authUserId,
      },
    })

    return {
      success: !!newTask,
    }
  }

  async update({
    id,
    title,
    content,
    order,
    columnId,
    authUserId,
  }: {
    id: Task['id']
    title?: Task['title']
    content?: Task['content']
    order?: Task['order']
    columnId?: Task['columnId']
    authUserId: User['id']
  }): Promise<{
    success: boolean
  }> {
    if (!authUserId) {
      throw Error('AuthUserId is required')
    }

    const updatedTask = await this.client.task.update({
      where: { id, createdByUserId: authUserId },
      data: {
        title: title || undefined,
        content: content || undefined,
        columnId: columnId || undefined,
        order: order?.toString(),
      },
    })

    return {
      success: !!updatedTask,
    }
  }

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
