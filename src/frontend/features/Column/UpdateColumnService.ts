import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Column from '@/shared/entities/Column'

type UpdateColumnRequest = {
  id: Column['id']
  title?: Column['title']
  order?: Column['order']
}

type UpdateColumnResponse = {
  success: boolean
}

export default class UpdateColumnService extends Service<
  UpdateColumnRequest,
  UpdateColumnResponse
> {
  constructor() {
    super()
  }

  async execute({
    id,
    title,
    order,
  }: UpdateColumnRequest): Promise<ServiceResponse<UpdateColumnResponse>> {
    try {
      const result = await apolloClient.mutate<{
        updateColumn: UpdateColumnResponse
      }>({
        mutation: UpdateColumnMutation,
        variables: { id, title, order },
      })

      return {
        data: result.data?.updateColumn,
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

const UpdateColumnMutation = gql`
  mutation UpdateColumnMutation($id: ID!, $title: String, $order: String) {
    updateColumn(id: $id, title: $title, order: $order) {
      success
    }
  }
`
