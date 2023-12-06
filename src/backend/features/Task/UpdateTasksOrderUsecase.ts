import Usecase from '@/backend/models/Usecase'
import { TaskOrderUpdateParamDTO } from '@/frontend/features/Task/TaskOrderUpdateParamDTO'
import User from '@/shared/entities/User'
import TaskRepository from './TaskRepository'

export type UpdateTasksOrderUsecaseRequest = {
  tasks: TaskOrderUpdateParamDTO[]
  authUserId: User['id']
}

export type UpdateTasksOrderUsecaseResponse = {
  success: boolean
}

export default class UpdateTasksOrderUsecase extends Usecase<
  UpdateTasksOrderUsecaseRequest,
  UpdateTasksOrderUsecaseResponse
> {
  private readonly taskRepository: TaskRepository

  constructor({ taskRepository }: { taskRepository?: TaskRepository } = {}) {
    super()
    this.taskRepository = taskRepository || new TaskRepository()
  }

  async execute({
    tasks,
    authUserId,
  }: UpdateTasksOrderUsecaseRequest): Promise<UpdateTasksOrderUsecaseResponse> {
    if (!authUserId) {
      throw Error('User should be authenticated')
    }

    tasks.forEach((task) => {
      if (!task.id) {
        throw Error('Task ID is required on each task')
      }

      if (!task.order) {
        throw Error('Task order is required on each task')
      }
      if (!task.columnId) {
        throw Error('Task column id is required on each task')
      }
    })

    const result = await this.taskRepository.updateTasksOrder({
      tasks,
      authUserId: authUserId,
    })

    if (!result) {
      throw Error('Something went wrong.')
    }

    return result
  }
}
