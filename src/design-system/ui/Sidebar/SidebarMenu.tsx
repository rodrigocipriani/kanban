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
    <div className="flex flex-col justify-between h-full w-full">
      {header && <div className="p-2">{header}</div>}
      <ul className="flex flex-col w-full shrink h-full pt-8">
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
