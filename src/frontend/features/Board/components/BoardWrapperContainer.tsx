import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'

import { Id } from '@/shared/types/Id'
import BoardColumn from './BoardColumn'
import BoardTask from './BoardTask'

type Props = {
  tasks: Task[]
  columns: Column[]
  setTasks: (tasks: Task[]) => void
  setColumns: (columns: Column[]) => void
  children: React.ReactNode
}

export default function BoardWrapper({
  tasks,
  columns,
  setTasks,
  setColumns,
  children,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) =>
        onDragStart({
          activeCurrentColumn: event?.active?.data?.current?.column,
          activeCurrentTask: event?.active?.data?.current?.task,
          setActiveColumn,
          setActiveTask,
        })
      }
      onDragEnd={(event) =>
        onDragEnd({
          activeId: event?.active?.id as Id,
          overId: event?.over?.id as Id,
          activeType: event?.active?.data?.current?.type,
          columns,
          setColumns,
          setActiveColumn,
          setActiveTask,
        })
      }
      onDragOver={(event) =>
        onDragOver({
          activeId: event?.active?.id as Id,
          overId: event?.over?.id as Id,
          activeType: event?.active?.data?.current?.type,
          overType: event?.over?.data?.current?.type,
          event,
          tasks,
          setTasks,
        })
      }
    >
      {children}

      {typeof document !== 'undefined' &&
        createPortal(
          <DragOverlay>
            {activeColumn && <BoardColumn columnId={activeColumn.id} />}
            {activeTask && <BoardTask taskId={activeTask.id} />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  )
}

export function onDragStart({
  activeCurrentColumn,
  activeCurrentTask,
  setActiveColumn,
  setActiveTask,
}: {
  activeCurrentColumn: Column | null
  activeCurrentTask: Task | null
  setActiveColumn: (column: Column | null) => void
  setActiveTask: (task: Task | null) => void
}) {
  if (activeCurrentColumn) {
    setActiveColumn(activeCurrentColumn)
    return
  }

  if (activeCurrentTask) {
    setActiveTask(activeCurrentTask)
    return
  }
}

export function onDragEnd({
  overId,
  activeId,
  activeType,
  columns,
  setColumns,
  setActiveColumn,
  setActiveTask,
}: {
  overId: Id
  activeId: Id
  activeType: 'Column' | 'Task'
  columns: Column[]
  setColumns: (columns: Column[]) => void
  setActiveColumn: (column: Column | null) => void
  setActiveTask: (task: Task | null) => void
}) {
  setActiveColumn(null)
  setActiveTask(null)

  if (!overId) return

  if (activeId === overId) return

  const isActiveAColumn = activeType === 'Column'

  if (!isActiveAColumn) return

  console.log('DRAG END')

  const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

  const overColumnIndex = columns.findIndex((col) => col.id === overId)

  const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex)

  setColumns(newColumns)
}

export function onDragOver({
  overId,
  activeId,
  activeType,
  overType,
  tasks,
  setTasks,
}: {
  overId: Id
  activeId: Id
  activeType: 'Column' | 'Task'
  overType: 'Column' | 'Task'
  event: DragOverEvent
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}) {
  if (!overId) return

  if (activeId === overId) return

  const isActiveATask = activeType === 'Task'
  const isOverATask = overType === 'Task'

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

  const isOverAColumn = overType === 'Column'
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
