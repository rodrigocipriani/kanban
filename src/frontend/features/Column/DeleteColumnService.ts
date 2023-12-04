import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Column from '@/shared/entities/Column'

type DeleteColumnRequest = {
  columnId: Column['id']
}

type DeleteColumnResponse = {
  success: boolean
}

export default class DeleteColumnService extends Service<
  DeleteColumnRequest,
  DeleteColumnResponse
> {
  constructor() {
    super()
  }

  async execute({
    columnId,
  }: DeleteColumnRequest): Promise<ServiceResponse<DeleteColumnResponse>> {
    try {
      const result = await apolloClient.mutate<{
        deleteColumn: DeleteColumnResponse
      }>({
        mutation: DeleteColumnMutation,
        variables: { columnId },
      })

      return {
        data: result.data?.deleteColumn,
        messages: [
          {
            type: 'success',
            message: 'Column deleted successfully',
          },
        ],
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

const DeleteColumnMutation = gql`
  mutation DeleteColumnMutation($columnId: ID!) {
    deleteColumn(columnId: $columnId) {
      success
    }
  }
`
