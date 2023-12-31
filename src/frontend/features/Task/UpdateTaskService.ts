import { gql } from '@apollo/client'
import { apolloClient } from '@/frontend/infra/Apollo/ApolloWrapper'
import Service, { ServiceResponse } from '@/frontend/models/Service'

import Task from '@/shared/entities/Task'

type UpdateTaskRequest = {
  id: Task['id']
  title?: Task['title']
  content?: Task['content']
  order?: Task['order']
  columnId?: Task['columnId']
}

type UpdateTaskResponse = {
  success: boolean
}

export default class UpdateTaskService extends Service<
  UpdateTaskRequest,
  UpdateTaskResponse
> {
  constructor() {
    super()
  }

  async execute({
    id,
    title,
    content,
    order,
    columnId,
  }: UpdateTaskRequest): Promise<ServiceResponse<UpdateTaskResponse>> {
    try {
      console.log('UpdateTaskService.execute', { id, title, content, order })
      const result = await apolloClient.mutate<{
        updateTask: UpdateTaskResponse
      }>({
        mutation: UpdateTaskMutation,
        variables: { id, title, content, order, columnId },
      })

      return {
        data: result.data?.updateTask,
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

const UpdateTaskMutation = gql`
  mutation UpdateTaskMutation(
    $id: ID!
    $title: String
    $content: String
    $order: String
    $columnId: ID
  ) {
    updateTask(
      id: $id
      title: $title
      content: $content
      order: $order
      columnId: $columnId
    ) {
      success
    }
  }
`
