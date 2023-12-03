import { User as PrismaUser } from '@prisma/client'

import Entity from '@/shared/entities/Entity'

type UserProps = Entity & PrismaUser

export default class User extends Entity {
  name: string
  email: string
  password: string
  role: string
  photo: string
  verified: boolean

  constructor({ id, name, email, password, role, photo, verified }: UserProps) {
    super({ id })

    this.name = name
    this.email = email
    this.password = password
    this.role = role || 'user'
    this.photo = photo || 'default.png'
    this.verified = verified || false
  }
}
