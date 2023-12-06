import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { Button } from '@/design-system/ui/Button'
import { Card, CardContent, CardHeader } from '@/design-system/ui/Card'
import { Dialog, DialogContent, DialogHeader } from '@/design-system/ui/Dialog'
import Icon from '@/design-system/ui/Icon'
import { Input } from '@/design-system/ui/Input'
import { Textarea } from '@/design-system/ui/Textarea'
import Typography from '@/design-system/ui/Typography'
import Task from '@/shared/entities/Task'
import { cn } from '@/shared/utilities/classNameMerge'
import { BoardItemType } from '../BoardItemType'
import useBoardStore from '../useBoardStore'

export default function BoardTask({ taskId }: { taskId: Task['id'] }) {
  const task = useBoardStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  )
  const deleteTask = useBoardStore((state) => state.deleteTask)
  const updateTask = useBoardStore((state) => state.updateTask)

  const [editMode, setEditMode] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: {
      type: BoardItemType.Task,
    },
    disabled: editMode,
  })

  if (!task) return null

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const handleDelete = () => {
    deleteTask({ taskId })
  }

  const handleStartEdit = () => {
    setEditMode(true)
  }

  const handleOnStopEdit = () => {
    setEditMode(false)
  }

  const handleOnSave = (task: Task) => {
    updateTask(task)
    setEditMode(false)
  }

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card
          className={cn(
            'group/taskCard relative h-32',
            isDragging ? 'animate-pulse opacity-20' : ''
          )}
          onClick={handleStartEdit}
        >
          <div className="invisible absolute right-0 top-0 group-hover/taskCard:visible">
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Icon icon="trash" />
            </Button>
          </div>
          <CardHeader className="p-2">
            <Typography variant="h6">{task.title}</Typography>
          </CardHeader>
          <CardContent className="p-2">
            <div className="line-clamp-3">{task.content}</div>
          </CardContent>
        </Card>
      </div>
      <EditTask
        isOpen={editMode}
        task={task}
        onClose={handleOnStopEdit}
        onSave={handleOnSave}
      />
    </>
  )
}

function EditTask({
  isOpen = false,
  task,
  onClose,
  onSave,
}: {
  isOpen?: boolean
  task: Task
  onClose?: () => void
  onSave?: (task: Task) => void
}) {
  const [title, setTitle] = useState(task.title)
  const [content, setContent] = useState(task.content)

  const handleOnClose = () => {
    onClose && onClose()
  }

  const handlOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!task) return

    if (!title) return

    onSave &&
      onSave({
        ...task,
        title,
        content,
      })
  }

  return (
    <Dialog open={!!isOpen} onOpenChange={handleOnClose}>
      <DialogContent>
        <form onSubmit={handlOnSubmit}>
          <DialogHeader>
            <div className="pr-8">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="pt-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <Button variant="default" type="submit">
                Save
              </Button>
            </div>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  )
}
