import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { generateId } from '@/shared/types/Id'
import { create } from 'zustand'
import { creativeColumns } from '../../../app/api/seed/mockDB'
import CreateTaskService from '../Task/CreateTaskService'
import DeleteTaskService from '../Task/DeleteTaskService'
import UpdateTaskService from '../Task/UpdateTaskService'

interface BoardState {
  // messages: ResponseMessage[]

  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  createTask: (columnId: { columnId: string }) => void
  deleteTask: (taskId: { taskId: string }) => void
  updateTask: ({
    id,
    title,
    content,
    order,
  }: {
    id: Task['id']
    title?: Task['title']
    content?: Task['content']
    order?: Task['order']
  }) => void

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
    // if (!response.data?.success) {
    //   set((state) => ({
    //     tasks: {
    //       ...state.tasks,
    //       taskToBeDeleted,
    //     },
    //   }))
    // }
  },
  updateTask: async (task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...t,
            ...task,
          }
        }

        return t
      }),
    }))

    const response = await new UpdateTaskService().execute({
      id: task.id,
      title: task.title,
      content: task.content,
      order: task.order,
    })

    if (!response.data?.success) {
      // TODO - revert state
    }
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
