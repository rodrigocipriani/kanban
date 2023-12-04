import { Card, CardContent, CardHeader } from '@/design-system/ui/Card'
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={task.id}
    >
      <Card className="h-32">
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
