import appPrismaClient from '@/backend/infra/appPrismaClient'
import { creativeColumns, creativeTasks } from './mockDB'

async function seed() {
  try {
    await appPrismaClient.task.deleteMany({})
    await appPrismaClient.column.deleteMany({})
    await appPrismaClient.user.deleteMany({})

    console.log('Deleted all users, columns, and tasks')

    const admin = await appPrismaClient.user.create({
      data: {
        id: '82a3bc8f-c619-4028-85d8-dc32cbc78267',
        email: 'admin@admin.com',
        name: 'Admin',
        password:
          '$2a$12$lxb8Ywvg6iQI938W9ujwM.RXsvVozLP2HsaZfexK72PqCqKIx5tCO',
      },
    })

    console.log('Added admin', admin)

    for (const column of creativeColumns) {
      const addedColumn = await appPrismaClient.column.create({
        data: {
          ...column,
          createdByUserId: admin.id,
        },
      })

      console.log('Added column', addedColumn)
    }

    for (const task of creativeTasks) {
      const addedTask = await appPrismaClient.task.create({
        data: {
          ...task,
          createdByUserId: admin.id,
          columnId: task.columnId,
        },
      })

      console.log('Added task', addedTask)
    }
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export default seed
