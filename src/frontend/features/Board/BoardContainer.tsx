'use client'

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useEffect } from 'react'
import Typography from '@/design-system/ui/Typography'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { GetAllColumns } from '../Column/GetAllColumns.graphql'
import { GetAllTasks } from '../Task/GetAllTasks.graphql'
import BoardColumnsContainer from './components/BoardColumnsContainer'
import BoardWrapper from './components/BoardWrapperContainer'
import useBoardStore from './useBoardStore'

export default function BoardContainer() {
  const { data: columnsData } = useSuspenseQuery<{ getAllColumns: Column[] }>(
    GetAllColumns
  )
  const { data: tasksData } = useSuspenseQuery<{
    getAllTasks: Task[]
  }>(GetAllTasks)

  const columns = useBoardStore((state) => state.columns)
  const tasks = useBoardStore((state) => state.tasks)
  const setColumns = useBoardStore((state) => state.setColumns)
  const setTasks = useBoardStore((state) => state.setTasks)

  useEffect(() => {
    if (columnsData) {
      setColumns(columnsData.getAllColumns)
    }
  }, [columnsData, setColumns])

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData.getAllTasks)
    }
  }, [tasksData, setTasks])

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
