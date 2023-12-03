// TODO - this whole file should be refactored using Apollo Client

import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { Id, generateId } from '@/shared/types/Id'

// export function createTask({
//   columnId,
//   tasks,
//   setTasks,
// }: {
//   columnId: Id
//   tasks: Task[]
//   setTasks: (tasks: Task[]) => void
// }) {
//   const newTask: Task = new Task({
//     id: generateId(),
//     columnId,
//     title: `Task ${tasks.length + 1}`,
//     content: `Task ${tasks.length + 1}`,
//   })

//   setTasks([...tasks, newTask])
// }

export function deleteTask({
  id,
  tasks,
  setTasks,
}: {
  id: Id
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}) {
  const newTasks = tasks.filter((task) => task.id !== id)
  setTasks(newTasks)
}

export function updateTask({
  id,
  content,
  tasks,
  setTasks,
}: {
  id: Id
  content: string
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}) {
  const newTasks = tasks.map((task) => {
    if (task.id !== id) return task
    return { ...task, content }
  })

  setTasks(newTasks)
}

// export function createNewColumn({
//   columns,
//   setColumns,
// }: {
//   columns: Column[]
//   setColumns: (columns: Column[]) => void
// }) {
//   const columnToAdd: Column = new Column({
//     id: generateId(),
//     title: `Column ${columns.length + 1}`,
//   })

//   setColumns([...columns, columnToAdd])
// }

export function deleteColumn({
  id,
  columns,
  setColumns,
  tasks,
  setTasks,
}: {
  id: Id
  columns: Column[]
  setColumns: (columns: Column[]) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}) {
  const newColumns = columns.filter((col) => col.id !== id)
  setColumns(newColumns)

  const newTasks = tasks.filter((t) => t.columnId !== id)
  setTasks(newTasks)
}

export function updateColumn({
  id,
  title,
  columns,
  setColumns,
}: {
  id: Id
  title: string
  columns: Column[]
  setColumns: (columns: Column[]) => void
}) {
  const newColumns = columns.map((col) => {
    if (col.id !== id) return col
    return { ...col, title }
  })

  setColumns(newColumns)
}

// export function onDragStart({
//   activeCurrentColumn,
//   activeCurrentTask,
//   setActiveColumn,
//   setActiveTask,
// }: {
//   activeCurrentColumn: Column | null
//   activeCurrentTask: Task | null
//   setActiveColumn: (column: Column | null) => void
//   setActiveTask: (task: Task | null) => void
// }) {
//   if (activeCurrentColumn) {
//     setActiveColumn(activeCurrentColumn)
//     return
//   }

//   if (activeCurrentTask) {
//     setActiveTask(activeCurrentTask)
//     return
//   }
// }

// export function onDragEnd({
//   overId,
//   activeId,
//   activeType,
//   columns,
//   setColumns,
//   setActiveColumn,
//   setActiveTask,
// }: {
//   overId: Id
//   activeId: Id
//   activeType: 'Column' | 'Task'
//   columns: Column[]
//   setColumns: (columns: Column[]) => void
//   setActiveColumn: (column: Column | null) => void
//   setActiveTask: (task: Task | null) => void
// }) {
//   setActiveColumn(null)
//   setActiveTask(null)

//   if (!overId) return

//   if (activeId === overId) return

//   const isActiveAColumn = activeType === 'Column'

//   if (!isActiveAColumn) return

//   console.log('DRAG END')

//   const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

//   const overColumnIndex = columns.findIndex((col) => col.id === overId)

//   const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex)

//   setColumns(newColumns)
// }

// export function onDragOver({
//   overId,
//   activeId,
//   activeType,
//   overType,
//   tasks,
//   setTasks,
// }: {
//   overId: Id
//   activeId: Id
//   activeType: 'Column' | 'Task'
//   overType: 'Column' | 'Task'
//   event: DragOverEvent
//   tasks: Task[]
//   setTasks: (tasks: Task[]) => void
// }) {
//   if (!overId) return

//   if (activeId === overId) return

//   const isActiveATask = activeType === 'Task'
//   const isOverATask = overType === 'Task'

//   if (!isActiveATask) return

//   if (isActiveATask && isOverATask) {
//     const activeIndex = tasks.findIndex((t: Task) => t.id === activeId)
//     const overIndex = tasks.findIndex((t: Task) => t.id === overId)

//     let newTasks = structuredClone(tasks)

//     if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
//       tasks[activeIndex] = {
//         ...tasks[activeIndex],
//         columnId: tasks[overIndex].columnId,
//       }
//       newTasks = arrayMove(tasks, activeIndex, overIndex - 1)
//     }

//     newTasks = arrayMove(tasks, activeIndex, overIndex)

//     setTasks(newTasks)
//   }

//   const isOverAColumn = overType === 'Column'
//   if (isActiveATask && isOverAColumn) {
//     const activeIndex = tasks.findIndex((t) => t.id === activeId)

//     tasks[activeIndex] = {
//       ...tasks[activeIndex],
//       columnId: overId,
//     }

//     console.log('DROPPING TASK OVER COLUMN', { activeIndex })

//     const newTasks = arrayMove(tasks, activeIndex, activeIndex)

//     setTasks(newTasks)
//   }
// }
