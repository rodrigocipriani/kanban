'use client'

import { useEffect } from 'react'
import Typography from '@/design-system/ui/Typography'
import useService from '@/frontend/helpers/useService'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import GetAllColumnsWithTasksService from '../Column/GetAllColumnsWithTasksService'
import BoardColumnsContainer from './components/BoardColumnsContainer'
import BoardWrapper from './components/BoardWrapperContainer'
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
    console.log('result', result)
    if (!isLoading && result?.data) {
      setTasks(result.data.tasks)
      setColumns(result.data.columns)
    }
  }, [isLoading, result, setColumns, setTasks])

  const handleSetColumns = (columns: Column[]) => {
    setColumns(columns)
  }

  const handleSetTasks = (tasks: Task[]) => {
    setTasks(tasks)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden p-4">
      <BoardWrapper
        columns={columns}
        tasks={tasks}
        setColumns={handleSetColumns}
        setTasks={handleSetTasks}
      >
        <div className="pb-4">
          <Typography variant="h3">Kanban Board</Typography>
        </div>
        {/* For now just exist one Board, in future we should pass boardId */}
        <BoardColumnsContainer />
      </BoardWrapper>
    </div>
  )
}
