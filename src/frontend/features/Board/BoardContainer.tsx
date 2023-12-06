'use client'

import { useEffect } from 'react'
import Typography from '@/design-system/ui/Typography'
import useService from '@/frontend/helpers/useService'
import GetAllColumnsWithTasksService from '../Column/GetAllColumnsWithTasksService'
import BoardColumnsContainer, {
  BoardColumnsContainerSkeleton,
} from './components/BoardColumnsContainer'
import useBoardStore from './useBoardStore'

export default function BoardContainer() {
  const { execute, isLoading, result } = useService({
    service: new GetAllColumnsWithTasksService(),
  })

  useEffect(() => {
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = useBoardStore((state) => state.columns)
  const tasks = useBoardStore((state) => state.tasks)
  const setColumns = useBoardStore((state) => state.setColumns)
  const setTasks = useBoardStore((state) => state.setTasks)

  useEffect(() => {
    if (!isLoading && result?.data) {
      setTasks(result.data.tasks)
      setColumns(result.data.columns)
    }
  }, [isLoading, result, setColumns, setTasks])

  return (
    <div className="flex h-screen flex-col overflow-hidden overflow-x-auto p-4">
      <div className="pb-4">
        <Typography variant="h3">Kanban Board</Typography>
      </div>
      {/* For now just exist one Board, in future we should pass boardId */}
      {isLoading ? (
        <BoardColumnsContainerSkeleton />
      ) : (
        <BoardColumnsContainer columns={columns} tasks={tasks} />
      )}
    </div>
  )
}
