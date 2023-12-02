'use client'

type Props = {
  children: React.ReactNode
  menu: React.ReactNode
}

export default function SidebarPlacedContainer({ children, menu }: Props) {
  return (
    <div className="flex h-full w-full">
      <section className="h-full w-96 max-w-xs flex-none bg-background p-4">
        {menu}
      </section>
      <main className="h-full w-full shrink overflow-x-auto">{children}</main>
    </div>
  )
}
