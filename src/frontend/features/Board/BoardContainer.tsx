'use client'

import Typography from '@/design-system/ui/Typography'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import BoardColumnsContainer from './components/BoardColumnsContainer'
import BoardWrapper from './components/BoardWrapperContainer'
import useBoardStore from './useBoardStore'

export default function BoardContainer() {
  const columns = useBoardStore((state) => state.columns)
  const tasks = useBoardStore((state) => state.tasks)
  const setColumns = useBoardStore((state) => state.setColumns)
  const setTasks = useBoardStore((state) => state.setTasks)

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
