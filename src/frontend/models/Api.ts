import isServerSide from '@/shared/utilities/isServerSide'
import { ResponseStatuses } from '../../backend/models/ResponseStatuses'
import { EndpointResponse } from './Endpoint'

export type ApiContructorProps = {
  host?: string
}

const DEFAULT_HOST = isServerSide
  ? process.env.API_URL
  : process.env.NEXT_PUBLIC_API_URL
export default class Api {
  private readonly host: string

  constructor({ host }: ApiContructorProps) {
    this.host = host || DEFAULT_HOST || ''
  }

  private async request<TResponse>(
    path: string,
    options?: RequestInit
  ): Promise<EndpointResponse<TResponse>> {
    const headers = new Headers(options?.headers)

    headers.set('Content-Type', 'application/json')

    const newOptions: RequestInit = {
      ...options,
      credentials: 'include',
      headers,
    }

    const response = await fetch(`${this.host}${path}`, newOptions)

    let data
    try {
      data = (await response.json()) as EndpointResponse<TResponse>
    } catch (error) {
      throw new Error('Invalid JSON response')
    }

    return {
      ...data,
      isSuccess: response.status === ResponseStatuses.Success,
      status: response.status,
      messages: data.messages || [],
    }
  }

  get<T>(path: string): Promise<EndpointResponse<T>> {
    return this.request<T>(path)
  }

  post<TRequest, TResponse>(
    path: string,
    body: TRequest
  ): Promise<EndpointResponse<TResponse>> {
    return this.request<TResponse>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }
}
