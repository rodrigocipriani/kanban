import { Id, generateId } from '../types/Id'

export type EntityProps = {
  id?: Id
}

export default abstract class Entity {
  readonly id: Id

  constructor({ id }: EntityProps) {
    this.id = id || generateId()
  }
}
