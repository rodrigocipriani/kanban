import { Controller, ControllerResponse } from "./Controller";

export default abstract class PublicController<
  TRequest,
  TResponse
> extends Controller<TRequest, TResponse> {
  constructor() {
    super();
  }

  protected abstract execute(
    request: TRequest
  ): Promise<ControllerResponse<TResponse>>;
}
