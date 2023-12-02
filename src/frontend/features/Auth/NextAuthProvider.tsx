'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import AuthUser from '@/shared/models/AuthUser'
import useAuthStore from './useAuthStore'

type Props = {
  children?: React.ReactNode
  authUser?: AuthUser | null
}

export const NextAuthProvider = ({ children, authUser }: Props) => {
  const [isHydrated, setIsHydrated] = React.useState(false)
  const setAuthUser = useAuthStore((state) => state.setAuthUser)

  React.useEffect(() => {
    if (authUser) {
      setAuthUser(authUser)
    }
    setIsHydrated(true)
  }, [authUser, setAuthUser])

  console.log('authUser', authUser)

  if (!isHydrated) {
    return null
  }

  return <SessionProvider>{children}</SessionProvider>
}
