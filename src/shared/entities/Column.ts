import Entity, { EntityProps } from './Entity'

type Props = EntityProps & {
  title: string
  order?: number
}

export default class Column extends Entity {
  readonly title: string

  readonly order: number

  constructor({ id, title, order }: Props) {
    super({ id })

    this.title = title
    this.order = order || 9999
  }
}
