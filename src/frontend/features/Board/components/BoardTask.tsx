import Task from '@/shared/entities/Task'
import useBoardStore from '../useBoardStore'
import BoardCard from './BoardCard'

export default function BoardTask({ taskId }: { taskId: Task['id'] }) {
  const task = useBoardStore((state) =>
    state.tasks.find((t) => t.id === taskId)
  )

  if (!task) return null

  return (
    <div key={task.id} className="w-80 border border-dashed border-orange-500">
      <BoardCard>{task.title}</BoardCard>
    </div>
  )
}
