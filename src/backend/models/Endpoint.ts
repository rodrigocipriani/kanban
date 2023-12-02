import { ZodError } from 'zod'
import zodIssuesToArray from '@/shared/utilities/zodIssuesToArray'
import Api from './Api'
import { ResponseMessage } from './ResponseMessage'
import { ResponseStatuses } from './ResponseStatuses'

export class EndpointResponse<TData> {
  data?: TData
  status: ResponseStatuses
  messages: ResponseMessage[]
  isSuccess: boolean

  constructor({
    data,
    status,
    messages,
  }: {
    data?: TData
    status: ResponseStatuses
    messages?: ResponseMessage[]
  }) {
    this.data = data
    this.status = status
    this.messages = messages || []
    this.isSuccess = status === ResponseStatuses.Success
  }
}

export default abstract class Endpoint<TRequest, TResponse> {
  protected readonly api: Api

  constructor({ api }: { api: Api }) {
    this.api = api
  }

  public abstract execute(
    request?: TRequest
  ): Promise<EndpointResponse<TResponse>>

  protected handleError(error: Error | unknown): EndpointResponse<TResponse> {
    if (error instanceof ZodError) {
      const messages: ResponseMessage[] = zodIssuesToArray({ error }).map(
        (message) => ({
          type: 'warning',
          message: message,
        })
      )
      return new EndpointResponse({
        status: ResponseStatuses.BadRequest,
        messages,
      })
    } else if (error instanceof Error) {
      return new EndpointResponse({
        status: ResponseStatuses.InternalServerError,
        messages: [{ type: 'error', message: error.message }],
      })
    } else {
      return new EndpointResponse({
        status: ResponseStatuses.InternalServerError,
        messages: [{ type: 'error', message: 'An unknown error occurred' }],
      })
    }
  }
}
