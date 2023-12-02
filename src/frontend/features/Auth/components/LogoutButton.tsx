'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/design-system/ui/Button'
import Icon from '@/design-system/ui/Icon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/design-system/ui/Tooltip'

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({
      callbackUrl: '/login',
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <Icon icon="exit" />
            <span className="sr-only">Fazer logout do sistema</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Fazer logout do sistema</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
