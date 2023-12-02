'use client'

import Column from '@/models/Column'
import { Id, generateId } from '@/types/Id'
import Task from '@/models/Task'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import PlusIcon from '../../icons/PlusIcon'
import ColumnContainer from './ColumnContainer'
import TaskCard from './TaskCard'

type Props = {
  tasks: Task[]
  columns: Column[]
  setTasks: (tasks: Task[]) => void
  setColumns: (columns: Column[]) => void
}

export default function KanbanBoard({
  tasks,
  columns,
  setTasks,
  setColumns,
}: Props) {
  const columnsId = useMemo(() => {
    if (!columns) return []

    return columns.map((col) => col.id)
  }, [columns])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={(event) =>
          onDragStart({
            event,
            setActiveColumn,
            setActiveTask,
          })
        }
        onDragEnd={(event) =>
          onDragEnd({
            event,
            columns,
            setColumns,
            tasks,
            setTasks,
            setActiveColumn,
            setActiveTask,
          })
        }
        onDragOver={(event) =>
          onDragOver({
            event,
            tasks,
            setTasks,
          })
        }
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={(id) =>
                    deleteColumn({
                      id,
                      columns,
                      setColumns,
                      tasks,
                      setTasks,
                    })
                  }
                  updateColumn={(id, title) =>
                    updateColumn({
                      id,
                      title,
                      columns,
                      setColumns,
                    })
                  }
                  createTask={(columnId) =>
                    createTask({
                      columnId,
                      tasks,
                      setTasks,
                    })
                  }
                  deleteTask={(id) =>
                    deleteTask({
                      id,
                      tasks,
                      setTasks,
                    })
                  }
                  updateTask={(id, content) =>
                    updateTask({
                      id,
                      content,
                      tasks,
                      setTasks,
                    })
                  }
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn({
                columns,
                setColumns,
              })
            }}
            className="flex h-[60px] w-[350px]  min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 p-4 ring-rose-500 hover:ring-2"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {typeof document !== 'undefined' &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={(id) =>
                    deleteColumn({
                      id,
                      columns,
                      setColumns,
                      tasks,
                      setTasks,
                    })
                  }
                  updateColumn={(id, title) =>
                    updateColumn({
                      id,
                      title,
                      columns,
                      setColumns,
                    })
                  }
                  createTask={(columnId) =>
                    createTask({
                      columnId,
                      tasks,
                      setTasks,
                    })
                  }
                  deleteTask={(id) =>
                    deleteTask({
                      id: id,
                      tasks,
                      setTasks,
                    })
                  }
                  updateTask={(id, content) =>
                    updateTask({
                      id: id,
                      content,
                      tasks,
                      setTasks,
                    })
                  }
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={(id) =>
                    deleteTask({
                      id,
                      tasks,
                      setTasks,
                    })
                  }
                  updateTask={(id, content) =>
                    updateTask({
                      id,
                      content,
                      tasks,
                      setTasks,
                    })
                  }
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  )
}

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
