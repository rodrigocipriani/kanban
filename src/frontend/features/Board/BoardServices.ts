// TODO - this whole file should be refactored using Apollo Client

import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { Id, generateId } from '@/shared/types/Id'

function createTask({
  columnId,
  tasks,
  setTasks,
}: {
  columnId: Id
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}) {
  const newTask: Task = new Task({
    id: generateId(),
    columnId,
    title: `Task ${tasks.length + 1}`,
    content: `Task ${tasks.length + 1}`,
  })

  setTasks([...tasks, newTask])
}

function deleteTask({
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

function updateTask({
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

function createNewColumn({
  columns,
  setColumns,
}: {
  columns: Column[]
  setColumns: (columns: Column[]) => void
}) {
  const columnToAdd: Column = new Column({
    id: generateId(),
    title: `Column ${columns.length + 1}`,
  })

  setColumns([...columns, columnToAdd])
}

function deleteColumn({
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

function updateColumn({
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

function onDragStart({
  event,
  setActiveColumn,
  setActiveTask,
}: {
  event: DragStartEvent
  setActiveColumn: (column: Column | null) => void
  setActiveTask: (task: Task | null) => void
}) {
  if (event.active.data.current?.type === 'Column') {
    setActiveColumn(event.active.data.current.column)
    return
  }

  if (event.active.data.current?.type === 'Task') {
    setActiveTask(event.active.data.current.task)
    return
  }
}

function onDragEnd({
  event,
  columns,
  setColumns,
  tasks,
  setTasks,
  setActiveColumn,
  setActiveTask,
}: {
  event: DragEndEvent
  columns: Column[]
  setColumns: (columns: Column[]) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  setActiveColumn: (column: Column | null) => void
  setActiveTask: (task: Task | null) => void
}) {
  setActiveColumn(null)
  setActiveTask(null)

  const { active, over } = event
  if (!over) return

  const activeId = active.id
  const overId = over.id

  if (activeId === overId) return

  const isActiveAColumn = active.data.current?.type === 'Column'
  if (!isActiveAColumn) return

  console.log('DRAG END')

  const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

  const overColumnIndex = columns.findIndex((col) => col.id === overId)

  const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex)

  setColumns(newColumns)
}

function onDragOver({
  event,
  tasks,
  setTasks,
}: {
  event: DragOverEvent
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}) {
  const { active, over } = event
  if (!over) return

  const activeId = active.id as Id
  const overId = over.id as Id

  if (activeId === overId) return

  const isActiveATask = active.data.current?.type === 'Task'
  const isOverATask = over.data.current?.type === 'Task'

  if (!isActiveATask) return

  if (isActiveATask && isOverATask) {
    const activeIndex = tasks.findIndex((t: Task) => t.id === activeId)
    const overIndex = tasks.findIndex((t: Task) => t.id === overId)

    let newTasks = structuredClone(tasks)

    if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
      tasks[activeIndex] = {
        ...tasks[activeIndex],
        columnId: tasks[overIndex].columnId,
      }
      newTasks = arrayMove(tasks, activeIndex, overIndex - 1)
    }

    newTasks = arrayMove(tasks, activeIndex, overIndex)

    setTasks(newTasks)
  }

  const isOverAColumn = over.data.current?.type === 'Column'

  if (isActiveATask && isOverAColumn) {
    const activeIndex = tasks.findIndex((t) => t.id === activeId)

    tasks[activeIndex] = {
      ...tasks[activeIndex],
      columnId: overId,
    }

    console.log('DROPPING TASK OVER COLUMN', { activeIndex })

    const newTasks = arrayMove(tasks, activeIndex, activeIndex)

    setTasks(newTasks)
  }
}

export {
  createTask,
  deleteTask,
  updateTask,
  createNewColumn,
  deleteColumn,
  updateColumn,
  onDragStart,
  onDragEnd,
  onDragOver,
}
