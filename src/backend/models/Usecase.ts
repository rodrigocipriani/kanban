export default abstract class Usecase<TRequest, TResponse> {
  abstract execute(request?: TRequest): TResponse | Promise<TResponse>
}
