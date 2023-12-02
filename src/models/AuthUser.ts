import Entity from './Entity'
import User from './User'

type UserProps = {
  id: User['id']
  name: User['name']
  email: User['email']
}

export default class AuthUser extends Entity {
  id: User['id']
  name: User['name']
  email: User['email']

  constructor({ id, name, email }: UserProps) {
    super()

    this.id = id
    this.name = name
    this.email = email
  }
}
