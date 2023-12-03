import { create } from 'zustand'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { generateId } from '@/shared/types/Id'
import { creativeColumns, creativeTasks } from '../../../app/api/seed/mockDB'

interface BoardState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  createTask: (columnId: { columnId: string }) => void

  columns: Column[]
  setColumns: (columns: Column[]) => void
  createColumn: () => void
}

const useBoardStore = create<BoardState>()((set) => ({
  tasks: creativeTasks,
  setTasks: (tasks) => set(() => ({ tasks: tasks })),
  createTask: ({ columnId }) => {
    const newTask: Task = new Task({
      id: generateId(),
      columnId,
      title: `Task ${creativeTasks.length + 1}`,
      content: `Task ${creativeTasks.length + 1}`,
    })

    // TODO - call graphql mutation to create task

    set((state) => ({ tasks: [...state.tasks, newTask] }))
  },
  columns: creativeColumns,
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
