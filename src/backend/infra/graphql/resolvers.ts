import ColumnRepository from '@/backend/features/Column/ColumnRepository'
import appPrismaClient from '../appPrismaClient'

const columnRepository = new ColumnRepository()

export const resolvers = {
  Query: {
    columns: async (_: never, { authUserId }: { authUserId: string }) => {
      return columnRepository.findAll({ authUserId })
    },
    // tasks: async () => {
    //   return prisma.task.findMany()
    // },
    // column: async (_, args) => {
    //   return prisma.column.findUnique({
    //     where: { id: args.id },
    //   })
    // },
    // task: async (_, args) => {
    //   return prisma.task.findUnique({
    //     where: { id: args.id },
    //   })
    // },
  },
  //   Mutation: {
  //     upsertColumn: async (_, args) => {
  //       return prisma.column.upsert({
  //         where: { id: args.id || '' },
  //         update: args,
  //         create: args,
  //       })
  //     },
  //     upsertTask: async (_, args) => {
  //       return prisma.task.upsert({
  //         where: { id: args.id || '' },
  //         update: args,
  //         create: args,
  //       })
  //     },
  //   },
  //   Column: {
  //     createdBy: async (parent) => {
  //       return prisma.user.findUnique({
  //         where: { id: parent.userId },
  //       })
  //     },
  //     tasks: async (parent) => {
  //       return prisma.task.findMany({
  //         where: { columnId: parent.id },
  //       })
  //     },
  //   },
  //   Task: {
  //     createdBy: async (parent) => {
  //       return prisma.user.findUnique({
  //         where: { id: parent.userId },
  //       })
  //     },
  //     column: async (parent) => {
  //       return prisma.column.findUnique({
  //         where: { id: parent.columnId },
  //       })
  //     },
  //   },
}
