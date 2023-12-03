import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import useBoardStore from '../useBoardStore'
import BoardTask from './BoardTask'
import { useSortable } from '@dnd-kit/sortable'
import Typography from '@/design-system/ui/Typography'
import { Skeleton } from '@/design-system/ui/Skeleton'

export default function BoardColumn({ columnId }: { columnId: Column['id'] }) {
  const column = useBoardStore((state) =>
    state.columns.find((c) => c.id === columnId)
  )
  const tasks = useBoardStore((state) =>
    state.tasks.filter((t) => t.columnId === columnId)
  )
  const createTask = useBoardStore((state) => state.createTask)

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
    // disabled: editMode,
  })

  if (!column) return null

  const style = {
    transition,
    transform: transform ? `translate3d(${transform.x}px, 0, 0)` : undefined,
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        // TODO - Column width should be get from some global state
        className="flex w-80 flex-col"
      >
        <Skeleton className="m-4 h-16" />
        <Skeleton className="m-4 h-32" />
        <Skeleton className="m-4 h-32" />
        <Skeleton className="m-4 h-32 opacity-50" />
        <Skeleton className="m-4 h-32 opacity-20" />
        <Skeleton className="m-4 h-32 opacity-5" />
      </div>
    )
  }

  return (
    <div className="flex flex-col" style={style}>
      <div {...attributes} {...listeners} ref={setNodeRef} className="p-4">
        <Typography variant="h4">{column.title}</Typography>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto bg-green-500">
        {tasks.map((task: Task) => (
          <BoardTask key={task.id} taskId={task.id} />
        ))}
      </div>
      <Button
        onClick={() => {
          createTask({
            columnId,
          })
        }}
      >
        <Icon icon="plus" />
        Add task
      </Button>
    </div>
  )
}
