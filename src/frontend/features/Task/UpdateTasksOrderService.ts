import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import { TaskOrderUpdateParamDTO } from './TaskOrderUpdateParamDTO'

type UpdateTasksOrderRequest = {
  tasks: TaskOrderUpdateParamDTO[]
}

type UpdateTasksOrderResponse = {
  success: boolean
}

export default class UpdateTasksOrderService extends Service<
  UpdateTasksOrderRequest,
  UpdateTasksOrderResponse
> {
  constructor() {
    super()
  }

  async execute({
    tasks,
  }: UpdateTasksOrderRequest): Promise<
    ServiceResponse<UpdateTasksOrderResponse>
  > {
    try {
      const result = await apolloClient.mutate<{
        UpdateTasksOrder: UpdateTasksOrderResponse
      }>({
        mutation: UpdateTasksOrderMutation,
        variables: { tasks },
      })

      return {
        data: result.data?.UpdateTasksOrder,
        messages: [
          {
            type: 'success',
            message: 'Task updated successfully',
          },
        ],
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

const UpdateTasksOrderMutation = gql`
  mutation UpdateTasksOrderMutation($tasks: [TaskOrderInput!]!) {
    updateTasksOrder(tasks: $tasks) {
      success
    }
  }
`
