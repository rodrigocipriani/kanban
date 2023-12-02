import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMemo, useState } from 'react'

import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { Id } from '@/shared/types/Id'

import TaskCard from './TaskCard'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void

  createTask: (columnId: Id) => void
  updateTask: (id: Id, content: string) => void
  deleteTask: (id: Id) => void
  tasks: Task[]
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false)

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-pink-500 bg-green-500 opacity-40"
      >
        aaaa
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex h-fit max-h-max w-[350px] flex-col overflow-y-visible rounded-md border border-orange-400"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true)
        }}
        className="sticky flex h-[60px] cursor-grab items-center justify-between rounded-md rounded-b-none border-4 bg-blue-500 p-3 text-base font-bold"
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center rounded-md px-2 py-1 text-sm">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="rounded border bg-black px-2 outline-none focus:border-rose-500"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false)
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return
                setEditMode(false)
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id)
          }}
          className="rounded  stroke-gray-500  px-1 py-2 hover:bg-slate-600 hover:stroke-white"
        >
          <Icon icon="trash" />
        </button>
      </div>

      <div className="flex flex-col gap-4 border border-yellow-400 p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <Button
        onClick={() => {
          createTask(column.id)
        }}
      >
        <Icon icon="plus" />
        Add task
      </Button>
    </div>
  )
}

export default ColumnContainer
