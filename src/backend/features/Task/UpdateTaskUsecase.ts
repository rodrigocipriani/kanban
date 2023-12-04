import Usecase from '@/backend/models/Usecase'
import Task from '@/shared/entities/Task'
import User from '@/shared/entities/User'
import TaskRepository from './TaskRepository'

export type UpdateTaskUsecaseRequest = {
  id: Task['id']
  title: Task['title']
  content?: Task['content']
  order?: Task['order']
  authUserId: User['id']
}

export type UpdateTaskUsecaseResponse = {
  success: boolean
}

export default class UpdateTaskUsecase extends Usecase<
  UpdateTaskUsecaseRequest,
  UpdateTaskUsecaseResponse
> {
  private readonly taskRepository: TaskRepository

  constructor({ taskRepository }: { taskRepository?: TaskRepository } = {}) {
    super()
    this.taskRepository = taskRepository || new TaskRepository()
  }

  async execute(
    params: UpdateTaskUsecaseRequest
  ): Promise<UpdateTaskUsecaseResponse> {
    const { id, title, content, order, authUserId } = params

    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    if (!id) {
      throw Error('Task ID is required')
    }

    if (!title) {
      throw Error('Title is required')
    }

    const result = await this.taskRepository.update({
      id,
      title,
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
