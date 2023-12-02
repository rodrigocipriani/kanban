'use client'

import * as z from 'zod'

export const LoginSchemaValidation = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Email is too short',
    })
    .email({
      message: 'Invalid email',
    }),
  password: z.string().min(2, {
    message: 'Password is too short',
  }),
})
