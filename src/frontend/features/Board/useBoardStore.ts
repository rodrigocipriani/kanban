import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { generateId } from '@/shared/types/Id'
import { create } from 'zustand'
import { creativeColumns } from '../../../app/api/seed/mockDB'
import CreateTaskService from '../Task/CreateTaskService'
import DeleteTaskService from '../Task/DeleteTaskService'

interface BoardState {
  // messages: ResponseMessage[]

  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  createTask: (columnId: { columnId: string }) => void
  deleteTask: (taskId: { taskId: string }) => void

  columns: Column[]
  setColumns: (columns: Column[]) => void
  createColumn: () => void
}

const useBoardStore = create<BoardState>()((set) => ({
  messages: [],
  tasks: [],
  setTasks: (tasks) => set(() => ({ tasks: tasks })),
  createTask: async ({ columnId }) => {
    const newTask: Task = new Task({
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
  deleteTask: async ({ taskId }) => {
    let taskToBeDeleted: Task | undefined

    set((state) => {
      taskToBeDeleted = state.tasks.find((task) => task.id === taskId)

      return {
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }
    })

    const response = await new DeleteTaskService().execute({ taskId })
    console.log('333 response', response)
    // if (!response.data?.success) {
    //   set((state) => ({
    //     tasks: {
    //       ...state.tasks,
    //       taskToBeDeleted,
    //     },
    //   }))
    // }
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
