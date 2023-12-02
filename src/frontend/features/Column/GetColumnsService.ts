import GetColumnsEndpoint from "@/frontend/infra/NextEndpoints/GetColumnsEndpoint";
import Service, { ServiceResponse } from "@/models/Service";
import Column from "@/models/Column";

type GetColumnsServiceRequest = never;

type GetColumnsServiceResponse = {
  columns: Column[];
};

export default class GetColumnsService extends Service<
  GetColumnsServiceRequest,
  GetColumnsServiceResponse
> {
  private readonly endpoint: GetColumnsEndpoint;

  constructor({ endpoint }: { endpoint?: GetColumnsEndpoint } = {}) {
    super();
    this.endpoint = endpoint || new GetColumnsEndpoint();
  }

  async execute(): Promise<ServiceResponse<GetColumnsServiceResponse>> {
    try {
      const response = await new GetColumnsEndpoint().execute();
      const columns = response.data?.columns || [];
      return {
        data: {
          columns,
        },
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
