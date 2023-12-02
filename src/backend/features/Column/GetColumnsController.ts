import { NextApi } from "@/frontend/infra/NextApi";
import Api from "@/models/Api";
import Column from "@/models/Column";
import { ControllerResponse } from "@/models/Controller";
import PrivateController from "@/models/PrivateController";
import { ResponseStatuses } from "@/models/ResponseStatuses";
import GetColumnsUsecase from "./GetColumnsUsecase";

type Request = never;
type Response = {
  columns: Column[];
};

export default class GetColumnsController extends PrivateController<
  Request,
  Response
> {
  private readonly api: Api;
  private readonly useCase: GetColumnsUsecase;

  constructor({
    useCase,
    api,
  }: { useCase?: GetColumnsUsecase; api?: Api } = {}) {
    super();
    this.api = api || new NextApi();

    this.useCase = useCase || new GetColumnsUsecase();
  }

  protected async executeImpl(): Promise<ControllerResponse<Response>> {
    try {
      let data = null;

      if (!this.authUserId) throw new Error("User is not logged in");

      data = await this.useCase.execute({
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
