'use client'

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'

import {
  createNewColumn,
  createTask,
  deleteColumn,
  deleteTask,
  onDragEnd,
  onDragOver,
  onDragStart,
  updateColumn,
  updateTask,
} from './BoardServices'
import ColumnContainer from './ColumnContainer'
import TaskCard from './TaskCard'

type Props = {
  tasks: Task[]
  columns: Column[]
  setTasks: (tasks: Task[]) => void
  setColumns: (columns: Column[]) => void
}

export default function KanbanBoard({
  tasks,
  columns,
  setTasks,
  setColumns,
}: Props) {
  const columnsId = useMemo(() => {
    if (!columns) return []

    return columns.map((col) => col.id)
  }, [columns])

  const [activeColumn, setActiveColumn] = useState<Column | null>(null)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={(event) =>
          onDragStart({
            event,
            setActiveColumn,
            setActiveTask,
          })
        }
        onDragEnd={(event) =>
          onDragEnd({
            event,
            columns,
            setColumns,
            tasks,
            setTasks,
            setActiveColumn,
            setActiveTask,
          })
        }
        onDragOver={(event) =>
          onDragOver({
            event,
            tasks,
            setTasks,
          })
        }
      >
        <div className="flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={(id) =>
                    deleteColumn({
                      id,
                      columns,
                      setColumns,
                      tasks,
                      setTasks,
                    })
                  }
                  updateColumn={(id, title) =>
                    updateColumn({
                      id,
                      title,
                      columns,
                      setColumns,
                    })
                  }
                  createTask={(columnId) =>
                    createTask({
                      columnId,
                      tasks,
                      setTasks,
                    })
                  }
                  deleteTask={(id) =>
                    deleteTask({
                      id,
                      tasks,
                      setTasks,
                    })
                  }
                  updateTask={(id, content) =>
                    updateTask({
                      id,
                      content,
                      tasks,
                      setTasks,
                    })
                  }
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            onClick={() => {
              createNewColumn({
                columns,
                setColumns,
              })
            }}
          >
            <Icon icon="plus" />
            Add Column
          </Button>
        </div>

        {typeof document !== 'undefined' &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={(id) =>
                    deleteColumn({
                      id,
                      columns,
                      setColumns,
                      tasks,
                      setTasks,
                    })
                  }
                  updateColumn={(id, title) =>
                    updateColumn({
                      id,
                      title,
                      columns,
                      setColumns,
                    })
                  }
                  createTask={(columnId) =>
                    createTask({
                      columnId,
                      tasks,
                      setTasks,
                    })
                  }
                  deleteTask={(id) =>
                    deleteTask({
                      id: id,
                      tasks,
                      setTasks,
                    })
                  }
                  updateTask={(id, content) =>
                    updateTask({
                      id: id,
                      content,
                      tasks,
                      setTasks,
                    })
                  }
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={(id) =>
                    deleteTask({
                      id,
                      tasks,
                      setTasks,
                    })
                  }
                  updateTask={(id, content) =>
                    updateTask({
                      id,
                      content,
                      tasks,
                      setTasks,
                    })
                  }
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  )
}
