import { UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import useBoardStore from '../useBoardStore'
import BoardColumn from './BoardColumn'

export default function BoardColumnsContainer() {
  const columns = useBoardStore((state) => state.columns)
  const createColumn = useBoardStore((state) => state.createColumn)

  const columnsId: { id: UniqueIdentifier }[] = useMemo(() => {
    if (!columns) return []

    const a: { id: UniqueIdentifier }[] = columns
      .filter((col) => !!col.id)
      .map((col) => ({ id: col.id as UniqueIdentifier }))

    return a
  }, [columns])

  return (
    <div className="flex gap-4 overflow-x-auto">
      <div className="flex gap-4">
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <BoardColumn key={column.id} columnId={column.id} />
          ))}
          <div className="w-80 pt-4">
            <Button className="w-full" onClick={createColumn}>
              <Icon icon="plus" />
              Add Column
            </Button>
          </div>
        </SortableContext>
      </div>
    </div>
  )
}
