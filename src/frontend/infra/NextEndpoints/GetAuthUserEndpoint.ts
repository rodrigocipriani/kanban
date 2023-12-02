import User from "@/models/User";
import { NextApi } from "../NextApi";
import Endpoint, { EndpointResponse } from "@/models/Endpoint";

type GetAuthUserEndpointRequest = never;

type GetAuthUserEndpointResponse = {
  user: User;
};

export default class GetAuthUserEndpoint extends Endpoint<
  GetAuthUserEndpointRequest,
  GetAuthUserEndpointResponse
> {
  private readonly path = "/users/me";

  constructor() {
    super({ api: new NextApi() });
  }

  public async execute(): Promise<
    EndpointResponse<GetAuthUserEndpointResponse>
  > {
    try {
      return await this.api.get<GetAuthUserEndpointResponse>(this.path);
    } catch (error) {
      return this.handleError(error);
    }
  }
}
