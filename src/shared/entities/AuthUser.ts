import User from '@/shared/entities/User'
import Entity, { EntityProps } from './Entity'

type UserProps = EntityProps & {
  id: User['id']
  name: User['name']
  email: User['email']
  image?: User['picture']
}

export default class AuthUser extends Entity {
  name: User['name']
  email: User['email']
  image?: User['picture']

  constructor({ id, name, email, image }: UserProps) {
    super({ id })
    this.name = name
    this.email = email
    this.image = image
  }
}
