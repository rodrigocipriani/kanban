import { NextApi } from "@/frontend/infra/NextApi";
import Api from "@/models/Api";
import Column from "@/models/Column";
import { ControllerResponse } from "@/models/Controller";
import PrivateController from "@/models/PrivateController";
import { ResponseStatuses } from "@/models/ResponseStatuses";
import Task from "@/models/Task";
import GetTasksUsecase from "./GetTasksUsecase";

type Request = {
  columnId: Column["id"];
};
type Response = {
  tasks: Task[];
};

export default class GetTasksController extends PrivateController<
  Request,
  Response
> {
  private readonly api: Api;
  private readonly useCase: GetTasksUsecase;

  constructor({ useCase, api }: { useCase?: GetTasksUsecase; api?: Api } = {}) {
    super();
    this.api = api || new NextApi();

    this.useCase = useCase || new GetTasksUsecase();
  }

  protected async executeImpl({
    columnId,
  }: Request): Promise<ControllerResponse<Response>> {
    try {
      let data = null;

      if (!this.authUserId) throw new Error("User is not logged in");

      data = await this.useCase.execute({
        columnId,
        authUserId: this.authUserId,
      });

      return new ControllerResponse({
        data,
        status: ResponseStatuses.Success,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }
}
