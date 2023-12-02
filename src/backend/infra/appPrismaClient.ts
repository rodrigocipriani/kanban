import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const appPrismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = appPrismaClient

export default appPrismaClient

export type AppPrismaClient = typeof appPrismaClient
