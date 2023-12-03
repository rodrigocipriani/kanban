import User from '@/shared/entities/User'
import Entity from './Entity'

type UserProps = Entity & {
  name: User['name']
  email: User['email']
}

export default class AuthUser extends Entity {
  name: User['name']
  email: User['email']

  constructor({ id, name, email }: UserProps) {
    super({ id })

    this.name = name
    this.email = email
  }
}
