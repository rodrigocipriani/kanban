'use client'

import { useEffect, useState } from 'react'
import useService from '@/frontend/helpers/useService'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import GetColumnsService from '../Column/GetColumnsService'
import GetTasksService from '../Task/GetTasksService'
import KanbanBoard from './KanbanBoard'

export default function BoardContainer() {
  const [columns, setColumns] = useState<Column[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  const {
    execute: executeTasks,
    isLoading: isLoadingTasks,
    result: resultTasks,
  } = useService({
    service: new GetTasksService(),
  })

  const {
    execute: executeColumns,
    isLoading: isLoadingColumns,
    result: resultColumns,
  } = useService({
    service: new GetColumnsService(),
  })

  useEffect(() => {
    executeTasks()
    executeColumns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!resultTasks || resultTasks?.data) return

    setTasks(resultTasks.data?.tasks || [])
  }, [resultTasks])

  useEffect(() => {
    if (!resultColumns || resultColumns?.data) return

    setColumns(resultColumns.data?.columns || [])
  }, [resultColumns])

  if (isLoadingTasks || isLoadingColumns) {
    return <div>Loading...</div>
  }

  const handleSetColumns = (columns: Column[]) => {
    setColumns(columns)
  }

  const handleSetTasks = (tasks: Task[]) => {
    setTasks(tasks)
  }

  return (
    <div>
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        setColumns={handleSetColumns}
        setTasks={handleSetTasks}
      />
    </div>
  )
}
