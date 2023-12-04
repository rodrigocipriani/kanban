import { create } from 'zustand'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { generateId } from '@/shared/types/Id'
import { creativeColumns, creativeTasks } from '../../../app/api/seed/mockDB'
import CreateTaskService from '../Task/CreateTaskService'

interface BoardState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  createTask: (columnId: { columnId: string }) => void

  columns: Column[]
  setColumns: (columns: Column[]) => void
  createColumn: () => void
}

const useBoardStore = create<BoardState>()((set) => ({
  tasks: [],
  // tasks: creativeTasks,
  setTasks: (tasks) => set(() => ({ tasks: tasks })),
  createTask: async ({ columnId }) => {
    const newTask: Task = new Task({
      id: generateId(),
      columnId,
      title: `New Task`,
      content: ``,
    })

    // TODO - call graphql mutation to create task
    const response = await new CreateTaskService().execute({ task: newTask })

    console.log('response 33333333', response)

    set((state) => ({ tasks: [...state.tasks, newTask] }))
  },
  columns: [],
  // columns: creativeColumns,
  setColumns: (columns) => set(() => ({ columns: columns })),
  createColumn: () => {
    const newColumn: Column = new Column({
      id: generateId(),
      title: `Column ${creativeColumns.length + 1}`,
    })

    // TODO - call graphql mutation to create column

    set((state) => ({ columns: [...state.columns, newColumn] }))
  },
}))

export default useBoardStore
