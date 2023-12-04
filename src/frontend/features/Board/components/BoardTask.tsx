import { Button } from '@/design-system/ui/Button'
import { Card, CardContent, CardHeader } from '@/design-system/ui/Card'
import Icon from '@/design-system/ui/Icon'
import { Skeleton } from '@/design-system/ui/Skeleton'
import Typography from '@/design-system/ui/Typography'
import Task from '@/shared/entities/Task'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useBoardStore from '../useBoardStore'

export default function BoardTask({ taskId }: { taskId: Task['id'] }) {
  const task = useBoardStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  )
  const deleteTask = useBoardStore((state) => state.deleteTask)

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
      type: 'Task',
      task,
    },
    // disabled: editMode,
  })

  if (!task) return null

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style}>
        <Skeleton className="h-32" />
      </div>
    )
  }

  const handleDelete = () => {
    deleteTask({ taskId })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={task.id}
    >
      <Card className="group/item relative h-32">
        <div className="invisible absolute right-0 top-0 group-hover/item:visible">
          <Button size="sm" onClick={handleDelete}>
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
  )
}
