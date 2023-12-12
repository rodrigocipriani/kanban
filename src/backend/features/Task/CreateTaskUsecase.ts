import Usecase from '@/backend/models/Usecase'
import Task from '@/shared/entities/Task'
import User from '@/shared/entities/User'
import TaskRepository from './TaskRepository'

export type CreateTaskUsecaseRequest = {
  title: Task['title']
  columnId: Task['columnId']
  authUserId: User['id']
  id?: Task['id']
  content?: Task['content']
  order?: Task['order']
}

export type CreateTaskUsecaseResponse = {
  success: boolean
}

export default class CreateTaskUsecase extends Usecase<
  CreateTaskUsecaseRequest,
  CreateTaskUsecaseResponse
> {
  private readonly taskRepository: TaskRepository

  constructor({ taskRepository }: { taskRepository?: TaskRepository } = {}) {
    super()
    this.taskRepository = taskRepository || new TaskRepository()
  }

  async execute(
    params: CreateTaskUsecaseRequest
  ): Promise<CreateTaskUsecaseResponse> {
    const { id, title, columnId, content, order, authUserId } = params

    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    if (!title) {
      throw Error('Task title is required')
    }

    if (!columnId) {
      throw Error('Task columnId is required')
    }

    const result = await this.taskRepository.create({
      id,
      title,
      columnId,
      content,
      order,
      authUserId: authUserId,
    })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
