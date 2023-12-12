import { Active, Over } from '@dnd-kit/core'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'
import { BoardItemType } from '../BoardItemType'

type EventItemCustomProps = {
  id: Task['id'] | Column['id']
  type: BoardItemType
}

export default function customEventMapper({
  active,
  over,
}: {
  active: Active
  over?: Over | null
}): {
  active: EventItemCustomProps
  over?: EventItemCustomProps
} | null {
  type EventData = {
    type: BoardItemType
    columnId?: Column['id']
  }

  const activeData = active.data.current as EventData
  const overData = over?.data.current as EventData

  if (activeData.type === BoardItemType.Column) {
    return {
      active: {
        id: active.id as Column['id'],
        type: activeData.type,
      },
      over: over
        ? {
            id: over.id as Column['id'],
            type: overData.type,
          }
        : undefined,
    }
  }

  if (activeData.type === BoardItemType.Task) {
    return {
      active: {
        id: active.id as Task['id'],
        type: activeData.type,
      },
      over: over
        ? {
            id: over.id as Task['id'],
            type: overData.type,
          }
        : undefined,
    }
  }

  return null
}
