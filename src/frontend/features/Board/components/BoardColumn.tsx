import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import { Input } from '@/design-system/ui/Input'
import { Skeleton } from '@/design-system/ui/Skeleton'
import Typography from '@/design-system/ui/Typography'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import useBoardStore from '../useBoardStore'
import BoardTask from './BoardTask'

export default function BoardColumn({ columnId }: { columnId: Column['id'] }) {
  const column = useBoardStore((state) =>
    state.columns.find((c) => c.id === columnId)
  )
  const tasks = useBoardStore((state) =>
    state.tasks.filter((t) => t.columnId === columnId)
  )
  const createTask = useBoardStore((state) => state.createTask)
  const updateColumn = useBoardStore((state) => state.updateColumn)
  const deleteColumn = useBoardStore((state) => state.deleteColumn)

  const [editMode, setEditMode] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columnId,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  })

  if (!column) return null

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="flex w-80 flex-col">
        <Skeleton className="m-4 h-16" />
        <Skeleton className="m-4 h-32" />
        <Skeleton className="m-4 h-32" />
        <Skeleton className="m-4 h-32 opacity-50" />
        <Skeleton className="m-4 h-32 opacity-20" />
        <Skeleton className="m-4 h-32 opacity-5" />
      </div>
    )
  }

  const handleDelete = () => {
    deleteColumn({ columnId })
  }

  const handleStartEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    if (!newTaskTitle) {
      setEditMode(false)
      setNewTaskTitle(column.title)
    }

    if (newTaskTitle !== column.title) {
      updateColumn({
        ...column,
        title: newTaskTitle,
      })
    }

    setEditMode(false)
  }

  return (
    <div style={style} ref={setNodeRef} className="relative flex flex-col">
      <div
        {...attributes}
        {...listeners}
        className="group/columnTitle p-4"
        onClick={handleStartEdit}
      >
        {editMode ? (
          <Input
            className="w-full"
            defaultValue={column.title}
            autoFocus
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              console.log(e.key)
              if (e.key === 'Enter' && e.shiftKey) {
                handleSave()
                return
              }

              if (e.key === 'Escape') {
                setEditMode(false)
                setNewTaskTitle(column.title)
                return
              }
            }}
          />
        ) : (
          <Typography variant="h4">{column.title}</Typography>
        )}

        <div className="invisible absolute right-0 top-0 group-hover/columnTitle:visible">
          <Button size="sm" variant="ghost" onClick={handleDelete}>
            <Icon icon="trash" />
          </Button>
        </div>
      </div>
      <div className="relative flex w-80 flex-col gap-4 overflow-y-auto rounded-md bg-slate-400 bg-opacity-50 p-4">
        {tasks.map((task: Task) => (
          <div key={task.id}>
            <BoardTask taskId={task.id} />
          </div>
        ))}
        <div className="sticky bottom-0 w-full">
          <Button
            className="w-full"
            onClick={() => {
              columnId &&
                createTask({
                  columnId,
                })
            }}
          >
            <Icon icon="plus" />
            Add task
          </Button>
        </div>
      </div>
    </div>
  )
}
