import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Column from '@/shared/entities/Column'

type CreateColumnRequest = {
  column: Column
}

type CreateColumnResponse = {
  success: boolean
}

export default class CreateColumnService extends Service<
  CreateColumnRequest,
  CreateColumnResponse
> {
  constructor() {
    super()
  }

  async execute({
    column,
  }: CreateColumnRequest): Promise<ServiceResponse<CreateColumnResponse>> {
    try {
      const result = await apolloClient.mutate<{
        createColumn: CreateColumnResponse
      }>({
        mutation: CreateColumnMutation,
        variables: column,
      })
      return {
        data: {
          success: result.data?.createColumn.success || false,
        },
        messages: [
          {
            type: 'success',
            message: 'Column created successfully',
          },
        ],
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

const CreateColumnMutation = gql`
  mutation CreateColumnMutation($id: ID!, $title: String!, $order: String) {
    createColumn(id: $id, title: $title, order: $order) {
      success
    }
  }
`
