import { z } from 'zod'

export const GetUserDetailValidation = z.object({
  id: z
    .string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string',
    })
    .min(1, { message: 'ID must be at least 1 character long' }),
})
