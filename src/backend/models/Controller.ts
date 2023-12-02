import { ZodError } from 'zod'
import zodIssuesToArray from '@/shared/utilities/zodIssuesToArray'
import { ResponseMessage } from '../../frontend/models/ResponseMessage'
import { ResponseStatuses } from './ResponseStatuses'

export class ControllerResponse<TResponse> {
  data?: TResponse
  messages?: ResponseMessage[]
  status: ResponseStatuses

  constructor({
    data,
    messages,
    status,
  }: {
    data?: TResponse
    messages?: ResponseMessage[]
    status: ResponseStatuses
  }) {
    this.data = data
    this.messages = messages
    this.status = status
  }
}

export abstract class Controller<TRequest, TResponse> {
  constructor() {}

  protected abstract execute(
    request?: TRequest
  ): Promise<ControllerResponse<TResponse>>

  protected handleError(error: Error | unknown): ControllerResponse<TResponse> {
    if (error instanceof ZodError) {
      const messages: ResponseMessage[] = zodIssuesToArray({ error }).map(
        (message) => ({
          type: 'warning',
          message: message,
        })
      )

      return new ControllerResponse({
        status: ResponseStatuses.BadRequest,
        messages,
      })
    } else if (error instanceof Error) {
      return new ControllerResponse({
        status: ResponseStatuses.InternalServerError,
        messages: [{ type: 'error', message: error.message }],
      })
    } else {
      return new ControllerResponse({
        status: ResponseStatuses.InternalServerError,
        messages: [{ type: 'error', message: 'An unknown error occurred' }],
      })
    }
  }
}
