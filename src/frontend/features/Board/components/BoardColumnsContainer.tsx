import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import useBoardStore from '../useBoardStore'
import BoardColumn from './BoardColumn'

export default function BoardColumnsContainer() {
  const columns = useBoardStore((state) => state.columns)
  const createColumn = useBoardStore((state) => state.createColumn)

  const columnsId = useMemo(() => {
    if (!columns) return []

    return columns.map((col) => col.id)
  }, [columns])

  return (
    <div className="flex gap-4 overflow-x-auto bg-slate-500">
      <div className="flex gap-4">
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <BoardColumn key={column.id} columnId={column.id} />
          ))}
          <Button onClick={createColumn}>
            <Icon icon="plus" />
            Add Column
          </Button>
        </SortableContext>
      </div>
    </div>
  )
}
