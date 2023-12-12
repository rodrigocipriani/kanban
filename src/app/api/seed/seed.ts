import appPrismaClient from '@/backend/infra/appPrismaClient'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { produceOrder } from '@/shared/types/Order'
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

    let prevColumn: Column | undefined
    for (const column of creativeColumns) {
      const conlumnObject = new Column({
        ...column,
        order: produceOrder(prevColumn?.order, undefined),
      })

      const addedColumn = await appPrismaClient.column.create({
        data: {
          ...conlumnObject,
          createdByUserId: admin.id,
          order: conlumnObject.order,
        },
      })

      prevColumn = conlumnObject

      console.log('Added column', addedColumn)
    }

    // group tasks by columnId
    const tasksByColumnId: Record<string, Task[]> = {}
    for (const task of creativeTasks) {
      if (!tasksByColumnId[task.columnId]) {
        tasksByColumnId[task.columnId] = []
      }

      tasksByColumnId[task.columnId].push(task)
    }

    for (const columnId in tasksByColumnId) {
      let prevTask: Task | undefined
      for (const task of tasksByColumnId[columnId]) {
        const taskObject = new Task({
          ...task,
          id: undefined,
          order: produceOrder(prevTask?.order, undefined),
        })

        const addedTask = await appPrismaClient.task.create({
          data: {
            ...taskObject,
            createdByUserId: admin.id,
            columnId: task.columnId,
            order: taskObject.order,
          },
        })

        console.log('Added task', addedTask)

        prevTask = taskObject
      }
    }
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export default seed
