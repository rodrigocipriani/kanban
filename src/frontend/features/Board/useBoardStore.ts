import { create } from 'zustand'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { generateId } from '@/shared/types/Id'
import { mockColumns, mockTasks } from './mockDB'

interface BoardState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  createTask: (columnId: { columnId: string }) => void

  columns: Column[]
  setColumns: (columns: Column[]) => void
  createColumn: () => void
}

const useBoardStore = create<BoardState>()((set) => ({
  tasks: mockTasks,
  setTasks: (tasks) => set(() => ({ tasks: tasks })),
  createTask: ({ columnId }) => {
    const newTask: Task = new Task({
      id: generateId(),
      columnId,
      title: `Task ${mockTasks.length + 1}`,
      content: `Task ${mockTasks.length + 1}`,
    })

    // TODO - call graphql mutation to create task

    set((state) => ({ tasks: [...state.tasks, newTask] }))
  },
  columns: mockColumns,
  setColumns: (columns) => set(() => ({ columns: columns })),
  createColumn: () => {
    const newColumn: Column = new Column({
      id: generateId(),
      title: `Column ${mockColumns.length + 1}`,
    })

    // TODO - call graphql mutation to create column

    set((state) => ({ columns: [...state.columns, newColumn] }))
  },
}))

export default useBoardStore
