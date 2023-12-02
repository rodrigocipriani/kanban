import GetAuthUserService from "@/backend/features/User/GetAuthUserUsecase";
import { Controller, ControllerResponse } from "./Controller";
import User from "./User";

export default abstract class PrivateController<
  TRequest,
  TResponse
> extends Controller<TRequest, TResponse> {
  protected authUserId: User["id"] | undefined;

  constructor() {
    super();
  }

  protected async execute(request?: TRequest) {
    const response = await new GetAuthUserService().execute();
    const authUserId = response.data?.user?.id;

    if (!authUserId) {
      throw new Error("User is not logged in");
    }

    this.authUserId = authUserId;

    return this.executeImpl(request);
  }

  protected abstract executeImpl(
    request?: TRequest
  ): Promise<ControllerResponse<TResponse>>;
}
