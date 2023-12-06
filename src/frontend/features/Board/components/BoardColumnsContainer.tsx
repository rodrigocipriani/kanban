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
import isServerSide from '@/shared/utilities/isServerSide'
import { TaskOrderUpdateParamDTO } from '../../Task/TaskOrderUpdateParamDTO'
import { BoardItemType } from '../BoardItemType'
import useBoardStore from '../useBoardStore'
import BoardColumn, { ColumnSkeleton } from './BoardColumn'
import BoardTask from './BoardTask'
import customEventMapper from './customEventMapper'

function sortOrderAsc(a: { order: number }, b: { order: number }) {
  return (a?.order || 0) - (b?.order || 0)
}

type CurrentState = {
  [columnId: Column['id']]: Task['id'][]
}

type Props = {
  tasks: Task[]
  columns: Column[]
}

export default function BoardColumnsContainer({ tasks, columns }: Props) {
  const updateTasksOrder = useBoardStore((state) => state.updateTasksOrder)
  const updateColumnsOrder = useBoardStore((state) => state.updateColumnsOrder)
  const createColumn = useBoardStore((state) => state.createColumn)

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
    let newColumns = structuredClone(columns).sort(sortOrderAsc)
    let newTasks = structuredClone(tasks)

    const newCurrentState: CurrentState = newColumns.reduce((acc, column) => {
      acc[column.id] = newTasks
        .filter((t) => t.columnId === column.id)
        .sort(sortOrderAsc)
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
          let order = 1
          updateColumnsOrder(
            Object.keys(currentState).map((columnId) => ({
              id: columnId,
              order: order++,
            }))
          )
        }

        if (active.type === BoardItemType.Task) {
          const storagedColumnId = tasks.find((task) => task.id === active.id)
            ?.columnId
          const currentColumnId = Object.entries(currentState).find(
            ([columnId, tasksIds]) => tasksIds.includes(active.id)
          )?.[0]

          let columnsToUpdate = [storagedColumnId]
          if (storagedColumnId !== currentColumnId) {
            columnsToUpdate.push(currentColumnId)
          }

          let tasksToUpdate: TaskOrderUpdateParamDTO[] = []
          columnsToUpdate.forEach((columnId) => {
            if (!columnId) return
            let order = 1
            tasksToUpdate.push(
              ...currentState[columnId].map((taskId) => ({
                id: taskId,
                columnId,
                order: order++,
              }))
            )
          })

          updateTasksOrder(tasksToUpdate)
        }
      }}
      onDragOver={(event) => {
        const data = customEventMapper({
          active: event.active,
          over: event.over,
        })

        if (!data) return
        const { active, over } = data

        console.log('active', active)
        console.log('over', over)

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
