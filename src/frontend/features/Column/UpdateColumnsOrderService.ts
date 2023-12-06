import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import { ColumnOrderUpdateParamDTO } from './ColumnOrderUpdateParamDTO'

type UpdateColumnsOrderRequest = {
  columns: ColumnOrderUpdateParamDTO[]
}

type UpdateColumnsOrderResponse = {
  success: boolean
}

export default class UpdateColumnsOrderService extends Service<
  UpdateColumnsOrderRequest,
  UpdateColumnsOrderResponse
> {
  constructor() {
    super()
  }

  async execute({
    columns,
  }: UpdateColumnsOrderRequest): Promise<
    ServiceResponse<UpdateColumnsOrderResponse>
  > {
    try {
      const result = await apolloClient.mutate<{
        UpdateColumnsOrder: UpdateColumnsOrderResponse
      }>({
        mutation: UpdateColumnsOrderMutation,
        variables: { columns },
      })

      return {
        data: result.data?.UpdateColumnsOrder,
        messages: [
          {
            type: 'success',
            message: 'Column updated successfully',
          },
        ],
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

const UpdateColumnsOrderMutation = gql`
  mutation UpdateColumnsOrderMutation($columns: [ColumnOrderInput!]!) {
    updateColumnsOrder(columns: $columns) {
      success
    }
  }
`
