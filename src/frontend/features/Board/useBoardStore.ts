import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { generateId } from '@/shared/types/Id'
import { create } from 'zustand'
import { creativeColumns } from '../../../app/api/seed/mockDB'
import CreateTaskService from '../Task/CreateTaskService'

interface BoardState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  createTask: (columnId: { columnId: string }) => void
  deleteTask: (taskId: { taskId: string }) => void

  columns: Column[]
  setColumns: (columns: Column[]) => void
  createColumn: () => void
}

const useBoardStore = create<BoardState>()((set) => ({
  tasks: [],
  setTasks: (tasks) => set(() => ({ tasks: tasks })),
  createTask: async ({ columnId }) => {
    const newTask: Task = new Task({
      id: generateId(),
      columnId,
      title: `New Task`,
      content: ``,
    })

    set((state) => ({ tasks: [...state.tasks, newTask] }))

    const response = await new CreateTaskService().execute({ task: newTask })
    if (!response.data?.success) {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== newTask.id),
      }))
    }
  },
  deleteTask: ({ taskId }) => {
    // TODO - call graphql mutation to delete task

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }))
  },

  columns: [],
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
