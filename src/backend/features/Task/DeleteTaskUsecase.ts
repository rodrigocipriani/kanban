import Usecase from '@/backend/models/Usecase'
import Task from '@/shared/entities/Task'
import User from '@/shared/entities/User'
import TaskRepository from './TaskRepository'

export type DeleteTaskUsecaseRequest = {
  taskId?: Task['id']
  authUserId: User['id']
}

export type DeleteTaskUsecaseResponse = {
  success: boolean
}

export default class DeleteTaskUsecase extends Usecase<
  DeleteTaskUsecaseRequest,
  DeleteTaskUsecaseResponse
> {
  private readonly taskRepository: TaskRepository

  constructor({ taskRepository }: { taskRepository?: TaskRepository } = {}) {
    super()
    this.taskRepository = taskRepository || new TaskRepository()
  }

  async execute(
    params: DeleteTaskUsecaseRequest
  ): Promise<DeleteTaskUsecaseResponse> {
    const { taskId, authUserId } = params

    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    if (!taskId) {
      throw Error('Task ID is required')
    }

    // const result = await this.taskRepository.delete({ taskId, authUserId })
    const result = await this.taskRepository.delete({
      taskId,
      authUserId,
    })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
