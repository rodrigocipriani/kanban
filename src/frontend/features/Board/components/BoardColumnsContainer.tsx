import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { produceOrder, sortArray } from '@/shared/types/Order'
import isServerSide from '@/shared/utilities/isServerSide'
import { BoardItemType } from '../BoardItemType'
import useBoardStore from '../useBoardStore'
import BoardColumn, { ColumnSkeleton } from './BoardColumn'
import BoardTask from './BoardTask'
import customEventMapper from './customEventMapper'

type CurrentState = {
  [columnId: Column['id']]: Task['id'][]
}

type Props = {
  tasks: Task[]
  columns: Column[]
}

export default function BoardColumnsContainer({ tasks, columns }: Props) {
  const createColumn = useBoardStore((state) => state.createColumn)
  const updateTask = useBoardStore((state) => state.updateTask)
  const updateColumn = useBoardStore((state) => state.updateColumn)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 25,
      },
    })
  )

  const [activeColumnId, setActiveColumnId] = useState<Column['id'] | null>(
    null
  )
  const [activeTaskId, setActiveTaskId] = useState<Task['id'] | null>(null)
  const [currentState, setCurrentState] = useState<CurrentState>({})

  useEffect(() => {
    let newColumns = sortArray(columns)
    let newTasks = sortArray(tasks)

    const newCurrentState: CurrentState = newColumns.reduce((acc, column) => {
      acc[column.id] = newTasks
        .filter((t) => t.columnId === column.id)
        .map((t) => t.id)
      return acc
    }, {} as CurrentState)

    setCurrentState(newCurrentState)
  }, [columns, tasks])

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        const data = customEventMapper(event)
        if (!data) return
        const { active } = data

        if (active.type === BoardItemType.Column) {
          setActiveColumnId(active.id as Column['id'])
        }

        if (active.type === BoardItemType.Task) {
          setActiveTaskId(active.id as Task['id'])
        }
      }}
      onDragEnd={(event) => {
        const data = customEventMapper({
          active: event.active,
        })
        if (!data) return
        const { active } = data

        setActiveColumnId(null)
        setActiveTaskId(null)

        if (!active) return

        if (active.type === BoardItemType.Column) {
          const currentColumnsItemns = Object.keys(currentState)

          const currentColumnIndex = currentColumnsItemns.findIndex(
            (columnId) => columnId === active.id
          )
          const columnBeforeId = currentColumnsItemns[currentColumnIndex - 1]
          const columnAfterId = currentColumnsItemns[currentColumnIndex + 1]
          const columnAfter = columns.find(
            (column) => column.id === columnAfterId
          )
          const columnBefore = columns.find(
            (column) => column.id === columnBeforeId
          )

          const activeColumnNewOrder = produceOrder(
            columnBefore?.order,
            columnAfter?.order
          )

          updateColumn({
            id: active.id,
            order: activeColumnNewOrder,
          })
        }

        if (active.type === BoardItemType.Task) {
          const currentColumnId = Object.entries(currentState).find(
            ([columnId, tasksIds]) => tasksIds.includes(active.id)
          )?.[0]

          if (!currentColumnId) return

          const currentColumnItems = currentState[currentColumnId]

          const activeTaskIndex = currentColumnItems.findIndex(
            (taskId) => taskId === active.id
          )

          const taskBeforeId = currentColumnItems[activeTaskIndex - 1]
          const taskAfterId = currentColumnItems[activeTaskIndex + 1]
          const taskBefore = tasks.find((task) => task.id === taskBeforeId)
          const taskAfter = tasks.find((task) => task.id === taskAfterId)

          const activeTaskNewOrder = produceOrder(
            taskBefore?.order,
            taskAfter?.order
          )

          updateTask({
            id: active.id,
            order: activeTaskNewOrder,
            columnId: currentColumnId,
          })
        }
      }}
      onDragOver={(event) => {
        const data = customEventMapper({
          active: event.active,
          over: event.over,
        })

        if (!data) return
        const { active, over } = data

        if (!over) return

        if (active.type === BoardItemType.Column) {
          const activeColumnId = active.id
          const overColumnId = over.id

          if (activeColumnId === overColumnId) return

          const activeIndex = Object.keys(currentState).findIndex(
            (columnId) => columnId === activeColumnId
          )
          const overIndex = Object.keys(currentState).findIndex(
            (columnId) => columnId === overColumnId
          )

          const newColumns = arrayMove(
            Object.keys(currentState),
            activeIndex,
            overIndex
          )

          setCurrentState(
            newColumns.reduce((acc, columnId) => {
              acc[columnId] = currentState[columnId]
              return acc
            }, {} as CurrentState)
          )

          return
        }

        if (active.type === BoardItemType.Task) {
          type TaskListWithColumnId = Record<Task['id'], Column['id']>
          const taskListWithColumnId: TaskListWithColumnId = Object.entries(
            currentState
          ).reduce((prev, [columnId, tasksIds]) => {
            return {
              ...prev,
              ...tasksIds.reduce((prev, taskId) => {
                prev[taskId] = columnId
                return prev
              }, {} as TaskListWithColumnId),
            }
          }, {} as TaskListWithColumnId)

          const activeColumnId = taskListWithColumnId[active.id]
          let overColumnId = over.id
          if (over.type === BoardItemType.Task) {
            overColumnId = taskListWithColumnId[over.id]
          }

          if (!activeColumnId || !overColumnId) return

          let newActive = currentState[activeColumnId]
          let newOver = currentState[overColumnId]
          let activeIndex = newActive.findIndex(
            (taskId) => taskId === active.id
          )
          const overIndex = currentState[overColumnId].findIndex(
            (taskId) => taskId === over.id
          )
          if (activeColumnId !== overColumnId) {
            newActive = currentState[activeColumnId].filter(
              (taskId) => taskId !== active.id
            )
            newOver = [...currentState[overColumnId], active.id]
            activeIndex = newOver.length - 1
          }

          const newOverSorted = arrayMove(newOver, activeIndex, overIndex)

          setCurrentState((currentState) => {
            return {
              ...currentState,
              [activeColumnId]: newActive,
              [overColumnId]: newOverSorted,
            }
          })
        }
      }}
    >
      <div className="flex gap-4 overflow-x-auto">
        <div className="flex gap-4">
          <SortableContext items={Object.keys(currentState)}>
            {Object.entries(currentState).map(([columnId, tasksIds]) => (
              <SortableContext
                key={columnId}
                items={Object.values(currentState).flat()}
              >
                <BoardColumn
                  columnId={columnId}
                  tasksIds={currentState[columnId]}
                />
              </SortableContext>
            ))}
            <div className="w-80 pt-4">
              <Button className="w-full" onClick={createColumn}>
                <Icon icon="plus" />
                Add Column
              </Button>
            </div>
          </SortableContext>
        </div>
      </div>

      {!isServerSide &&
        createPortal(
          <DragOverlay>
            {activeColumnId && (
              <BoardColumn
                columnId={activeColumnId}
                tasksIds={currentState[activeColumnId]}
              />
            )}
            {activeTaskId && <BoardTask taskId={activeTaskId} />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  )
}

export function BoardColumnsContainerSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto">
      <div className="flex gap-4">
        <ColumnSkeleton />
        <ColumnSkeleton />
        <ColumnSkeleton />
      </div>
    </div>
  )
}
