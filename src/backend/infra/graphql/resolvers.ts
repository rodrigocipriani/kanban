import ColumnRepository from '@/backend/features/Column/ColumnRepository'
import GetColumnsUsecase from '@/backend/features/Column/GetColumnsUsecase'
import CreateTaskUsecase from '@/backend/features/Task/CreateTaskUsecase'
import DeleteTaskUsecase from '@/backend/features/Task/DeleteTaskUsecase'
import GetTasksUsecase from '@/backend/features/Task/GetTasksUsecase'
import TaskRepository from '@/backend/features/Task/TaskRepository'
import UpdateTaskUsecase from '@/backend/features/Task/UpdateTaskUsecase'
import UserRepository from '@/backend/features/User/UserRepository'
import AuthUser from '@/shared/entities/AuthUser'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'

const columnRepository = new ColumnRepository()
const taskRepository = new TaskRepository()
const userRepository = new UserRepository()

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

    // getAllUsers: async (
    //   _parent: never,
    //   _args: never,
    //   context: { authUser?: AuthUser }
    // ) => {
    //   return userRepository.findAll()
    // },
    // getUser: async (
    //   _parent: never,
    //   { id }: { id: string },
    //   context: { authUser?: AuthUser }
    // ) => {
    //   return userRepository.findById({ id })
    // },
    // getColumn: async (
    //   _parent: never,
    //   { id }: { id: string },
    //   context: { authUser?: AuthUser }
    // ) => {
    //   return columnRepository.findById(id)
    // },
    // getTask: async (
    //   _parent: never,
    //   { id }: { id: string },
    //   context: { authUser?: AuthUser }
    // ) => {
    //   return taskRepository.findById({ id })
    // },
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
      // return taskRepository.delete({ taskId, authUserId: context.authUser.id })
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

    // createUser: async (
    //   _: never,
    //   {
    //     name,
    //     email,
    //     password,
    //   }: { name: string; email: string; password: string }
    // ) => {
    //   return userRepository.create({ name, email, password })
    // },
    // updateUser: async (
    //   _: never,
    //   {
    //     id,
    //     name,
    //     email,
    //     password,
    //     role,
    //     photo,
    //     verified,
    //   }: {
    //     id: string
    //     name: string
    //     email: string
    //     password: string
    //     role?: string
    //     photo?: string
    //     verified?: boolean
    //   }
    // ) => {
    //   return userRepository.update({
    //     id,
    //     name,
    //     email,
    //     password,
    //     role,
    //     photo,
    //     verified,
    //   })
    // },
    // deleteUser: async (_: never, { id }: { id: string }) => {
    //   return userRepository.delete(id)
    // },
    // createColumn: async (
    //   _: never,
    //   { title, createdByUserId }: { title: string; createdByUserId: string }
    // ) => {
    //   return columnRepository.create({ title, createdByUserId })
    // },
    // updateColumn: async (
    //   _: never,
    //   { id, title, order }: { id: string; title: string; order?: number }
    // ) => {
    //   return columnRepository.update({ id, title, order })
    // },
    // deleteColumn: async (_: never, { id }: { id: string }) => {
    //   return columnRepository.delete(id)
    // },
    // updateTask: async (
    //   _: never,
    //   {
    //     id,
    //     title,
    //     content,
    //     order,
    //   }: { id: string; title: string; content?: string; order?: number }
    // ) => {
    //   return taskRepository.update({ id, title, content, order })
    // },
  },
  // Additional resolvers for nested fields or relationships can be added here
}
