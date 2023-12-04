'use client'

import { Toaster } from '@/design-system/ui/Toast/toaster'
import { ThemeProvider } from '@/design-system/theme/theme-provider'
import AppLayout from './AppLayout'
import useMessagesContainer from '../Board/useMessagesContainer'

type Props = {
  children: React.ReactNode
}

export default function AppContainer({ children }: Props) {
  useMessagesContainer()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppLayout>{children}</AppLayout>

      <Toaster />
    </ThemeProvider>
  )
}
