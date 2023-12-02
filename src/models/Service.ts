import { ResponseMessage } from './ResponseMessage'

export class ServiceResponse<TResponse> {
  data?: TResponse
  messages?: ResponseMessage[]

  constructor({
    data,
    messages,
  }: {
    data?: TResponse
    messages?: ResponseMessage[]
  } = {}) {
    this.data = data
    this.messages = messages
  }
}

export default abstract class Service<TRequest, TResponse> {
  abstract execute(
    request?: TRequest
  ): ServiceResponse<TResponse> | Promise<ServiceResponse<TResponse>>

  public handleError(error: Error | unknown): ServiceResponse<TResponse> {
    if (error instanceof Error) {
      return new ServiceResponse({
        messages: [{ type: 'error', message: error.message }],
      })
    } else {
      return new ServiceResponse({
        messages: [{ type: 'error', message: 'An unknown error occurred' }],
      })
    }
  }
}
