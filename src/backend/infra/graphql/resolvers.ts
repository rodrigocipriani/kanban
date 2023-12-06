import CreateColumnUsecase from '@/backend/features/Column/CreateColumnUsecase'
import DeleteColumnUsecase from '@/backend/features/Column/DeleteColumnUsecase'
import GetColumnsUsecase from '@/backend/features/Column/GetColumnsUsecase'
import UpdateColumnUsecase from '@/backend/features/Column/UpdateColumnUsecase'
import UpdateColumnsOrderUsecase from '@/backend/features/Column/UpdateColumnsOrderUsecase'
import CreateTaskUsecase from '@/backend/features/Task/CreateTaskUsecase'
import DeleteTaskUsecase from '@/backend/features/Task/DeleteTaskUsecase'
import GetTasksUsecase from '@/backend/features/Task/GetTasksUsecase'
import UpdateTaskUsecase from '@/backend/features/Task/UpdateTaskUsecase'
import UpdateTasksOrderUsecase from '@/backend/features/Task/UpdateTasksOrderUsecase'
import { ColumnOrderUpdateParamDTO } from '@/frontend/features/Column/ColumnOrderUpdateParamDTO'
import { TaskOrderUpdateParamDTO } from '@/frontend/features/Task/TaskOrderUpdateParamDTO'
import AuthUser from '@/shared/entities/AuthUser'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'

export const resolvers = {
  Query: {
    columns: async (
      _parent: never,
      _args: never,
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      const usecase = await new GetColumnsUsecase().execute({
        authUserId: context.authUser.id,
      })

      return usecase.columns
    },
    tasks: async (
      _parent: never,
      { columnId }: { columnId: Column['id'] },
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      const usecase = await new GetTasksUsecase().execute({
        authUserId: context.authUser.id,
        columnId,
      })

      return usecase.tasks
    },
  },
  Mutation: {
    createTask: async (
      _: never,
      task: Task,
      context: { authUser?: AuthUser }
    ): Promise<{ success: boolean }> => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      const result = new CreateTaskUsecase().execute({
        task,
        authUserId: context.authUser.id,
      })

      return result
    },
    deleteTask: async (
      _: never,
      { taskId }: { taskId: Task['id'] },
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      return new DeleteTaskUsecase().execute({
        taskId,
        authUserId: context.authUser.id,
      })
    },
    updateTask: async (
      _: never,
      {
        id,
        title,
        content,
        order,
      }: { id: string; title: string; content?: string; order?: number },
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      return new UpdateTaskUsecase().execute({
        id,
        title,
        content,
        order,
        authUserId: context.authUser.id,
      })
    },
    updateTasksOrder: async (
      _: never,
      { tasks }: { tasks: TaskOrderUpdateParamDTO[] },
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      return new UpdateTasksOrderUsecase().execute({
        tasks,
        authUserId: context.authUser.id,
      })
    },

    createColumn: async (
      _: never,
      column: Column,
      context: { authUser?: AuthUser }
    ): Promise<{ success: boolean }> => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      const result = new CreateColumnUsecase().execute({
        column,
        authUserId: context.authUser.id,
      })

      return result
    },
    deleteColumn: async (
      _: never,
      { columnId }: { columnId: Column['id'] },
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      return new DeleteColumnUsecase().execute({
        columnId,
        authUserId: context.authUser.id,
      })
    },
    updateColumn: async (
      _: never,
      { id, title, order }: { id: string; title: string; order?: number },
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      return new UpdateColumnUsecase().execute({
        id,
        title,
        order,
        authUserId: context.authUser.id,
      })
    },
    updateColumnsOrder: async (
      _: never,
      { columns }: { columns: ColumnOrderUpdateParamDTO[] },
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      return new UpdateColumnsOrderUsecase().execute({
        columns,
        authUserId: context.authUser.id,
      })
    },
  },
}
