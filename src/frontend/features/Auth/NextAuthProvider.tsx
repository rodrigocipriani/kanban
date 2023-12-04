'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import AuthUser from '@/shared/entities/AuthUser'
import useAuthStore from './useAuthStore'

type Props = {
  children?: React.ReactNode
  authUser?: AuthUser | null
}

export const NextAuthProvider = ({ children, authUser }: Props) => {
  // const [isHydrated, setIsHydrated] = React.useState(false)
  const setAuthUser = useAuthStore((state) => state.setAuthUser)

  React.useEffect(() => {
    if (authUser) {
      setAuthUser(authUser)
    }
    // setIsHydrated(true)
  }, [authUser, setAuthUser])

  // if (!isHydrated) {
  //   return null
  // }

  return (
    <SessionProvider
    // session={session}
    // Default base path if your app lives at the root "/"
    // basePath="/"
    // Re-fetch session every 5 minutes
    // refetchInterval={5 * 60}
    // Re-fetches session when window is focused
    // refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  )
}
