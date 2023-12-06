import { create } from 'zustand'
import { ResponseMessage } from '@/frontend/models/ResponseMessage'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { ColumnOrderUpdateParamDTO } from '../Column/ColumnOrderUpdateParamDTO'
import CreateColumnService from '../Column/CreateColumnService'
import DeleteColumnService from '../Column/DeleteColumnService'
import UpdateColumnService from '../Column/UpdateColumnService'
import UpdateColumnsOrderService from '../Column/UpdateColumnsOrderService'
import CreateTaskService from '../Task/CreateTaskService'
import DeleteTaskService from '../Task/DeleteTaskService'
import { TaskOrderUpdateParamDTO } from '../Task/TaskOrderUpdateParamDTO'
import UpdateTaskService from '../Task/UpdateTaskService'
import UpdateTasksOrderService from '../Task/UpdateTasksOrderService'

type UpdateTasksOrder = {
  id: Task['id']
  order: Task['order']
}

interface BoardState {
  // TODO - move to global state
  messages: ResponseMessage[]
  addMessages: (messages: ResponseMessage[]) => void
  addMessage: (message: ResponseMessage) => void
  removeMessage: (message: ResponseMessage) => void

  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  updateTasksOrder: (tasks: TaskOrderUpdateParamDTO[]) => void
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
  updateColumnsOrder: (columns: ColumnOrderUpdateParamDTO[]) => void
  createColumn: () => void
  deleteColumn: (columnId: { columnId: string }) => void
  updateColumn: ({
    id,
    title,
    order,
  }: {
    id: Column['id']
    title?: Column['title']
    order?: Column['order']
  }) => void
}

const useBoardStore = create<BoardState>()((set, get) => ({
  messages: [],
  addMessages: (messages) =>
    set((state) => ({ messages: [...state.messages, ...messages] })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  removeMessage: (message) =>
    set((state) => ({ messages: state.messages.filter((m) => m !== message) })),

  tasks: [],
  setTasks: (tasks) => {
    set(() => ({ tasks: tasks }))
  },
  updateTasksOrder: async (tasks) => {
    const response = await new UpdateTasksOrderService().execute({
      tasks,
    })

    if (response.messages) {
      get().addMessages(response.messages)
    }

    set((state) => ({
      ...state,
      tasks: state.tasks.map((task) => {
        const newTask = tasks.find((t) => t.id === task.id)

        if (newTask) {
          return {
            ...task,
            order: newTask.order,
            columnId: newTask.columnId,
          }
        }

        return task
      }),
    }))
  },
  createTask: async ({ columnId }) => {
    const newTask: Task = new Task({
      columnId,
      title: `New Task`,
      content: ``,
    })

    set((state) => ({ tasks: [...state.tasks, newTask] }))

    const response = await new CreateTaskService().execute({ task: newTask })

    if (response.messages) {
      get().addMessages(response.messages)
    }

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

    if (response.messages) {
      get().addMessages(response.messages)
    }
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

    if (response.messages) {
      get().addMessages(response.messages)
    }

    if (!response.data?.success) {
      // TODO - revert state
    }
  },

  columns: [],
  setColumns: (columns) => {
    set(() => ({ columns: columns }))
  },
  updateColumnsOrder: async (columns) => {
    const response = await new UpdateColumnsOrderService().execute({
      columns,
    })

    if (response.messages) {
      get().addMessages(response.messages)
    }

    set((state) => ({
      ...state,
      columns: state.columns.map((column) => {
        const newColumn = columns.find((c) => c.id === column.id)

        if (newColumn) {
          return {
            ...column,
            order: newColumn.order,
          }
        }

        return column
      }),
    }))
  },
  createColumn: async () => {
    const newColumn: Column = new Column({
      title: `New Column`,
    })

    set((state) => ({ columns: [...state.columns, newColumn] }))

    const response = await new CreateColumnService().execute({
      column: newColumn,
    })

    if (response.messages) {
      get().addMessages(response.messages)
    }

    if (!response.data?.success) {
      set((state) => ({
        columns: state.columns.filter((column) => column.id !== newColumn.id),
      }))
    }
  },
  deleteColumn: async ({ columnId }) => {
    let columnToBeDeleted: Column | undefined

    set((state) => {
      columnToBeDeleted = state.columns.find((column) => column.id === columnId)

      return {
        columns: state.columns.filter((column) => column.id !== columnId),
      }
    })

    const response = await new DeleteColumnService().execute({ columnId })

    if (response.messages) {
      get().addMessages(response.messages)
    }
  },
  updateColumn: async (column) => {
    set((state) => ({
      columns: state.columns.map((t) => {
        if (t.id === column.id) {
          return {
            ...t,
            ...column,
          }
        }

        return t
      }),
    }))

    const response = await new UpdateColumnService().execute({
      id: column.id,
      title: column.title,
      order: column.order,
    })

    if (response.messages) {
      get().addMessages(response.messages)
    }

    if (!response.data?.success) {
      // TODO - revert state
    }
  },
}))

export default useBoardStore
