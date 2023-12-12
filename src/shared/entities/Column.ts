import { Order, produceOrder } from '../types/Order'
import Entity, { EntityProps } from './Entity'

type Props = EntityProps & {
  title: string
  order: Order
}

export default class Column extends Entity {
  readonly title: string
  readonly order: Order

  constructor({ id, title, order }: Props) {
    super({ id })

    this.title = title
    this.order = order
  }
}
