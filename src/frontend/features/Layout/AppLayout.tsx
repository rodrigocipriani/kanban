'use client'

import { useRouter } from 'next/navigation'
import { ThemeSwitch } from '@/design-system/theme/theme-switch'
import Icon from '@/design-system/ui/Icon'
import Sidebar from '@/design-system/ui/Sidebar'
import { MenuOption } from '@/design-system/ui/Sidebar/SidebarMenu'
import Typography from '@/design-system/ui/Typography'
import LogoutButton from '@/frontend/features/Auth/components/LogoutButton'
import useAuthStore from '../Auth/useAuthStore'

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  const authUser = useAuthStore((state) => state.authUser)

  const router = useRouter()

  const MENU_OPTIONS: MenuOption[] = [
    {
      label: 'Dashboard',
      icon: <Icon size="sm" icon="moon" />,
      onClick: () => router.push('/dashboards'),
    },
    {
      label: 'Users',
      icon: <Icon size="sm" icon="sun" />,
      onClick: () => router.push('/transactions'),
    },
    {
      label: 'Settings',
      icon: <Icon size="sm" icon="exit" />,
      onClick: () => router.push('/customers'),
    },
  ]

  return (
    <div>
      <Sidebar
        header={<div>Micro1 Kanban</div>}
        footer={
          <div>
            <div>Hello, {authUser ? authUser.name : ''}</div>
            <div className="flex w-full flex-row justify-end">
              <ThemeSwitch />
              <LogoutButton />
            </div>
          </div>
        }
        menuOptions={MENU_OPTIONS}
        showMenu={!!authUser}
      >
        {children}
      </Sidebar>
    </div>
  )
}
