import ColumnRepository from '@/backend/features/Column/ColumnRepository'
import TaskRepository from '@/backend/features/Task/TaskRepository'
import UserRepository from '@/backend/features/User/UserRepository'
import AuthUser from '@/shared/entities/AuthUser'
import Column from '@/shared/entities/Column'

const columnRepository = new ColumnRepository()
const taskRepository = new TaskRepository()
const userRepository = new UserRepository()

export const resolvers = {
  Query: {
    getAllUsers: async (
      _parent: never,
      _args: never,
      context: { authUser?: AuthUser }
    ) => {
      return userRepository.findAll()
    },
    getUser: async (
      _parent: never,
      { id }: { id: string },
      context: { authUser?: AuthUser }
    ) => {
      return userRepository.findById({ id })
    },
    getColumn: async (
      _parent: never,
      { id }: { id: string },
      context: { authUser?: AuthUser }
    ) => {
      return columnRepository.findById(id)
    },
    getAllColumns: async (
      _parent: never,
      _args: never,
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }

      return columnRepository.findAll({ authUserId: context.authUser.id })
    },
    getTask: async (
      _parent: never,
      { id }: { id: string },
      context: { authUser?: AuthUser }
    ) => {
      return taskRepository.findById({ id })
    },
    getAllTasks: async (
      _parent: never,
      { columnId }: { columnId: Column['id'] },
      context: { authUser?: AuthUser }
    ) => {
      if (!context.authUser) {
        throw new Error('Authentication required')
      }
      return taskRepository.findAll({
        columnId,
        authUserId: context.authUser.id,
      })
    },
  },
  // Mutation: {
  //   createUser: async (
  //     _: never,
  //     {
  //       name,
  //       email,
  //       password,
  //     }: { name: string; email: string; password: string }
  //   ) => {
  //     return userRepository.create({ name, email, password })
  //   },
  //   updateUser: async (
  //     _: never,
  //     {
  //       id,
  //       name,
  //       email,
  //       password,
  //       role,
  //       photo,
  //       verified,
  //     }: {
  //       id: string
  //       name: string
  //       email: string
  //       password: string
  //       role?: string
  //       photo?: string
  //       verified?: boolean
  //     }
  //   ) => {
  //     return userRepository.update({
  //       id,
  //       name,
  //       email,
  //       password,
  //       role,
  //       photo,
  //       verified,
  //     })
  //   },
  //   deleteUser: async (_: never, { id }: { id: string }) => {
  //     return userRepository.delete(id)
  //   },
  //   createColumn: async (
  //     _: never,
  //     { title, createdByUserId }: { title: string; createdByUserId: string }
  //   ) => {
  //     return columnRepository.create({ title, createdByUserId })
  //   },
  //   updateColumn: async (
  //     _: never,
  //     { id, title, order }: { id: string; title: string; order?: number }
  //   ) => {
  //     return columnRepository.update({ id, title, order })
  //   },
  //   deleteColumn: async (_: never, { id }: { id: string }) => {
  //     return columnRepository.delete(id)
  //   },
  //   createTask: async (
  //     _: never,
  //     {
  //       title,
  //       content,
  //       order,
  //       columnId,
  //       createdByUserId,
  //     }: {
  //       title: string
  //       content?: string
  //       order?: number
  //       columnId: string
  //       createdByUserId: string
  //     }
  //   ) => {
  //     return taskRepository.create({
  //       title,
  //       content,
  //       order,
  //       columnId,
  //       createdByUserId,
  //     })
  //   },
  //   updateTask: async (
  //     _: never,
  //     {
  //       id,
  //       title,
  //       content,
  //       order,
  //     }: { id: string; title: string; content?: string; order?: number }
  //   ) => {
  //     return taskRepository.update({ id, title, content, order })
  //   },
  //   deleteTask: async (_: never, { id }: { id: string }) => {
  //     return taskRepository.delete(id)
  //   },
  // },
  // Additional resolvers for nested fields or relationships can be added here
}
