import { ZodError } from 'zod'

export default function zodIssuesToArray({
  error,
}: {
  error: ZodError
}): string[] {
  const messages: string[] = []

  for (const issue of error.issues) {
    const message = issue.message

    messages.push(message)
  }

  return messages
}
