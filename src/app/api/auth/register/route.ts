import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import {
  RegisterUserInput,
  RegisterUserSchema,
} from '@/frontend/features/Auth/validations/user.schema'
import appPrismaClient from '@/backend/infra/appPrismaClient'
import getErrorResponse from '@/frontend/helpers/getErrorResponse'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserInput
    const data = RegisterUserSchema.parse(body)

    const hashedPassword = await hash(data.password, 12)

    const user = await appPrismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        photo: data.photo,
      },
    })

    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data: { user: { ...user, password: undefined } },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'failed validations', error)
    } else if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return getErrorResponse(409, 'user with that email already exists')
    } else if (error instanceof Error) {
      return getErrorResponse(500, error.message)
    } else {
      return getErrorResponse(500, 'An unknown error occurred')
    }
  }
}
