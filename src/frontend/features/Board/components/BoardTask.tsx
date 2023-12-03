import { Card, CardContent, CardHeader } from '@/design-system/ui/Card'
import { Skeleton } from '@/design-system/ui/Skeleton'
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
        <Skeleton className="h-32 w-80" />
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
      <Card className="h-32 w-80">
        <CardHeader>{task.title}</CardHeader>
        <CardContent>{task.content}</CardContent>
      </Card>
    </div>
  )
}
