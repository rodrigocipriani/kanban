import { User as PrismaUser } from '@prisma/client'

import Entity, { EntityProps } from '@/shared/entities/Entity'

type UserProps = EntityProps & PrismaUser

export default class User extends Entity {
  name: string
  email: string
  password: string
  role: string
  picture: string
  verified: boolean

  constructor({
    id,
    name,
    email,
    password,
    role,
    picture,
    verified,
  }: UserProps) {
    super({ id })

    this.name = name
    this.email = email
    this.password = password
    this.role = role || 'user'
    this.picture = picture || 'default.png'
    this.verified = verified || false
  }
}
