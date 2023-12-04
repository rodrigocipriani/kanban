import Usecase from '@/backend/models/Usecase'
import Task from '@/shared/entities/Task'
import User from '@/shared/entities/User'
import TaskRepository from './TaskRepository'

export type CreateTaskUsecaseRequest = {
  task: Task
  authUserId: User['id']
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
    const { task, authUserId } = params

    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    if (!task) {
      throw Error('Task is required')
    }

    const result = await this.taskRepository.create({
      task: new Task(task),
      authUserId: authUserId,
    })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
