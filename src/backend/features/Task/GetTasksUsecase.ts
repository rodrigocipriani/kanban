import Usecase from '@/backend/models/Usecase'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import User from '@/shared/entities/User'
import { GetTasksValidation } from './GetTasksValidation'
import TaskRepository from './TaskRepository'

export type GetTasksUsecaseRequest = {
  columnId: Column['id']
  authUserId: User['id']
}

export type GetTasksUsecaseResponse = {
  tasks: Task[]
}

export default class GetTasksUsecase extends Usecase<
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
    const { columnId, authUserId } = GetTasksValidation.parse(params)

    const tasks = await this.taskRepository.findAll({ columnId, authUserId })

    if (!tasks) {
      throw Error('Something went wrong.')
    }

    return {
      tasks,
    }
  }
}
