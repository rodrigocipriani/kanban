import { Id } from 'react-beautiful-dnd'
import Entity from './Entity'

type Props = Entity & {
  title: string
  order?: number
  content?: string
  columnId: Id
}

export default class Task extends Entity {
  readonly title: string
  readonly order: number
  readonly content?: string
  readonly columnId: Id

  constructor({ id, title, order, content, columnId }: Props) {
    super({ id })

    this.title = title
    this.order = order || 9999
    this.content = content
    this.columnId = columnId
  }
}
