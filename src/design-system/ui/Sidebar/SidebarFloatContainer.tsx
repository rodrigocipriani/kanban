'use client'

import { Button } from '../Button'
import { Sheet, SheetContent, SheetTrigger } from '../Sheet'

type Props = {
  children: React.ReactNode
  menu: React.ReactNode
}

export default function SidebarFloatContainer({ children, menu }: Props) {
  return (
    <div className="h-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent side="left">{menu}</SheetContent>
      </Sheet>
      {children}
    </div>
  )
}
