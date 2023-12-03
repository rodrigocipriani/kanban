import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import useBoardStore from '../useBoardStore'
import BoardTask from './BoardTask'
import { useSortable } from '@dnd-kit/sortable'
import Typography from '@/design-system/ui/Typography'
import { Skeleton } from '@/design-system/ui/Skeleton'
import { CSS } from '@dnd-kit/utilities'

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
    transform: CSS.Transform.toString(transform),
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
    <div
      style={style}
      ref={setNodeRef}
      className="flex flex-col rounded-md bg-slate-400 bg-opacity-50 p-4"
    >
      <div {...attributes} {...listeners} className="p-4">
        <Typography variant="h4">{column.title}</Typography>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {tasks.map((task: Task) => (
          <BoardTask key={task.id} taskId={task.id} />
        ))}
      </div>
      <div className="w-full pt-4">
        <Button
          className="w-full"
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
    </div>
  )
}