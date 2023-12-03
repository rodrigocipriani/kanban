import { Id, generateId } from '../types/Id'

export default abstract class Entity {
  readonly id: Id

  constructor({ id }: { id?: Id }) {
    this.id = id || generateId()
  }
}
