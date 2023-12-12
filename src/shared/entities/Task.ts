import { Id } from 'react-beautiful-dnd'
import { Order, produceOrder } from '@/shared/types/Order'
import Entity, { EntityProps } from './Entity'

type Props = EntityProps & {
  id?: Id
  title: string
  order: Order
  content?: string
  columnId: Id
}

export default class Task extends Entity {
  readonly title: string
  readonly order: Order
  readonly content?: string
  readonly columnId: Id

  constructor({ id, title, order, content, columnId }: Props) {
    super({ id: id })

    this.title = title
    this.order = order
    this.content = content
    this.columnId = columnId
  }
}
