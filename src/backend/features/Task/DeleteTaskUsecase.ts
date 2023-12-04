import Usecase from '@/backend/models/Usecase'
import Task from '@/shared/entities/Task'
import User from '@/shared/entities/User'
import TaskRepository from './TaskRepository'

export type GetTasksUsecaseRequest = {
  taskId?: Task['id']
  authUserId: User['id']
}

export type GetTasksUsecaseResponse = {
  success: boolean
}

export default class DeleteTaskUsecase extends Usecase<
  GetTasksUsecaseRequest,
  GetTasksUsecaseResponse
> {
  private readonly taskRepository: TaskRepository

  constructor({ taskRepository }: { taskRepository?: TaskRepository } = {}) {
    super()
    this.taskRepository = taskRepository || new TaskRepository()
  }

  async execute(
    params: GetTasksUsecaseRequest
  ): Promise<GetTasksUsecaseResponse> {
    const { taskId, authUserId } = params

    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    if (!taskId) {
      throw Error('Task ID is required')
    }

    const result = await this.taskRepository.delete({ taskId, authUserId })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
