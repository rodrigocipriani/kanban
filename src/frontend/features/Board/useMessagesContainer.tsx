'use client'

import { useEffect } from 'react'
import { useToast } from '@/design-system/ui/Toast/use-toast'
import useBoardStore from './useBoardStore'

// TODO - Should be moved to a global store
export default function useMessagesContainer() {
  const messages = useBoardStore((state) => state.messages)
  const removeMessage = useBoardStore((state) => state.removeMessage)
  const { toast } = useToast()

  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach((message) => {
        console.log('message', message)
        toast({
          title: message.type === 'error' ? 'Error' : 'Success',
          description: message.message,
          variant: message.type === 'error' ? 'destructive' : 'default',
        })
        removeMessage(message)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return messages
}
