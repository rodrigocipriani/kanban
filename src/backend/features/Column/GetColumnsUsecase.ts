import Column from "@/models/Column";
import Usecase from "@/models/Usecase";
import User from "@/models/User";
import ColumnRepository from "./ColumnRepository";
import { GetColumnsValidation } from "./GetColumnsValidation";

export type GetColumnsUsecaseRequest = {
  authUserId: User["id"];
};

export type GetColumnsUsecaseResponse = {
  columns: Column[];
};

export default class GetColumnsUsecase extends Usecase<
  GetColumnsUsecaseRequest,
  GetColumnsUsecaseResponse
> {
  private readonly columnRepository: ColumnRepository;

  constructor({
    columnRepository,
  }: { columnRepository?: ColumnRepository } = {}) {
    super();
    this.columnRepository = columnRepository || new ColumnRepository();
  }

  async execute(
    params: GetColumnsUsecaseRequest
  ): Promise<GetColumnsUsecaseResponse> {
    const { authUserId } = GetColumnsValidation.parse(params);

    const columns = await this.columnRepository.findAll({ authUserId });

    if (!columns) {
      throw Error("Something went wrong.");
    }

    return {
      columns,
    };
  }
}
