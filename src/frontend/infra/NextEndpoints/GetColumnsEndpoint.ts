
import Endpoint, { EndpointResponse } from '@/backend/models/Endpoint'

import Column from '@/shared/entities/Column'

import { NextApi } from '../NextApi'


type GetColumnsEndpointRequest = never

type GetColumnsEndpointResponse = {
  columns: Column[]
}

export default class GetColumnsEndpoint extends Endpoint<
  GetColumnsEndpointRequest,
  GetColumnsEndpointResponse
> {
  private readonly path = '/columns'

  constructor() {
    super({ api: new NextApi() })
  }

  public async execute(): Promise<
    EndpointResponse<GetColumnsEndpointResponse>
  > {
    try {
      return await this.api.get<GetColumnsEndpointResponse>(this.path)
    } catch (error) {
      return this.handleError(error)
    }
  }
}
