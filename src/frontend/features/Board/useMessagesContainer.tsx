'use client'

import { useEffect } from 'react'
import { useToast } from '@/design-system/ui/Toast/use-toast'
import useBoardStore from './useBoardStore'

// TODO - Should be moved to a global store
export default function useMessagesContainer() {
  const messages = useBoardStore((state) => state.messages)
  const removeMessage = useBoardStore((state) => state.removeMessage)
  const { toast, toasts } = useToast()

  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach((message) => {
        toast({
          id: message.message,
          description: message.message,
          variant: message.type === 'error' ? 'destructive' : 'default',
          duration: 5000,
        })
        removeMessage(message)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return messages
}
