'use client'

import SidebarFloatContainer from './SidebarFloatContainer'
import SidebarMenu, { MenuOption } from './SidebarMenu'
import SidebarPlacedContainer from './SidebarPlacedContainer'

type Props = {
  children: React.ReactNode
  menuOptions: MenuOption[]
  header?: React.ReactNode
  footer?: React.ReactNode
  showMenu?: boolean
}

export default function Sidebar({
  children,
  menuOptions,
  header,
  footer,
  showMenu,
}: Props) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="block sm:hidden min-h-screen w-full">
        <SidebarFloatContainer
          menu={
            <SidebarMenu
              menuOptions={menuOptions}
              header={header}
              footer={footer}
            />
          }
        >
          {children}
        </SidebarFloatContainer>
      </div>
      <div className="hidden sm:block min-h-screen w-full">
        {showMenu ? (
          <SidebarPlacedContainer
            menu={
              <SidebarMenu
                header={header}
                footer={footer}
                menuOptions={menuOptions}
              />
            }
          >
            {children}
          </SidebarPlacedContainer>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  )
}
