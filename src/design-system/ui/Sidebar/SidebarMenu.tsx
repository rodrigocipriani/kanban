import React from 'react'
import { Button } from '../Button'

export type MenuOption = {
  label: string
  icon?: React.ReactNode
  children?: MenuOption[]
  onClick?: () => void
}

type Props = {
  menuOptions: MenuOption[]
  header?: React.ReactNode
  footer?: React.ReactNode
}

export default function SidebarMenu({ menuOptions, header, footer }: Props) {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      {header && <div className="p-2">{header}</div>}
      <ul className="flex h-full w-full shrink flex-col pt-8">
        {menuOptions.map((menuOption) => (
          <li key={menuOption.label} className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={menuOption.onClick}
            >
              {menuOption.icon && (
                <span className="pr-4">{menuOption.icon}</span>
              )}
              {menuOption.label}
              {menuOption.children && (
                <SidebarMenu menuOptions={menuOption.children} />
              )}
            </Button>
          </li>
        ))}
      </ul>
      {footer && <div className="p-2">{footer}</div>}
    </div>
  )
}
