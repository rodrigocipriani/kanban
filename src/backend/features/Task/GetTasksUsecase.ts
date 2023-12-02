import Column from "@/models/Column";
import Task from "@/models/Task";
import Usecase from "@/models/Usecase";
import { GetTasksValidation } from "./GetTasksValidation";
import TaskRepository from "./TaskRepository";
import User from "@/models/User";

export type GetTasksUsecaseRequest = {
  columnId: Column["id"];
  authUserId: User["id"];
};

export type GetTasksUsecaseResponse = {
  tasks: Task[];
};

export default class GetTasksUsecase extends Usecase<
  GetTasksUsecaseRequest,
  GetTasksUsecaseResponse
> {
  private readonly taskRepository: TaskRepository;

  constructor({ taskRepository }: { taskRepository?: TaskRepository } = {}) {
    super();
    this.taskRepository = taskRepository || new TaskRepository();
  }

  async execute(
    params: GetTasksUsecaseRequest
  ): Promise<GetTasksUsecaseResponse> {
    const { columnId, authUserId } = GetTasksValidation.parse(params);

    const tasks = await this.taskRepository.findAll({ columnId, authUserId });

    if (!tasks) {
      throw Error("Something went wrong.");
    }

    return {
      tasks,
    };
  }
}
