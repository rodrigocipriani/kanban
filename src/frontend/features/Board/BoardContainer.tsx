'use client'

import { useEffect, useState } from 'react'
import Typography from '@/design-system/ui/Typography'
import useService from '@/frontend/helpers/useService'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import GetColumnsService from '../Column/GetColumnsService'
import GetTasksService from '../Task/GetTasksService'
import BoardColumnsContainer from './components/BoardColumnsContainer'
import BoardWrapper from './components/BoardWrapperContainer'
import useBoardStore from './useBoardStore'

export default function BoardContainer() {
  const columns = useBoardStore((state) => state.columns)
  const tasks = useBoardStore((state) => state.tasks)
  const setColumns = useBoardStore((state) => state.setColumns)
  const setTasks = useBoardStore((state) => state.setTasks)

  // const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  // const [activeTask, setActiveTask] = useState<Task | null>(null)

  // const {
  //   execute: executeTasks,
  //   isLoading: isLoadingTasks,
  //   result: resultTasks,
  // } = useService({
  //   service: new GetTasksService(),
  // })

  // const {
  //   execute: executeColumns,
  //   isLoading: isLoadingColumns,
  //   result: resultColumns,
  // } = useService({
  //   service: new GetColumnsService(),
  // })

  // useEffect(() => {
  //   executeTasks()
  //   executeColumns()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   if (!resultTasks || resultTasks?.data) return

  //   setTasks(resultTasks.data?.tasks || [])
  // }, [resultTasks])

  // useEffect(() => {
  //   if (!resultColumns || resultColumns?.data) return

  //   setColumns(resultColumns.data?.columns || [])
  // }, [resultColumns])

  // if (isLoadingTasks || isLoadingColumns) {
  //   return <div>Loading...</div>
  // }

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
        // setActiveColumn={setActiveColumn}
        // setActiveTask={setActiveTask}
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
