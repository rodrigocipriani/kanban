'use client'

type Props = {
  children: React.ReactNode
  menu: React.ReactNode
}

export default function SidebarPlacedContainer({ children, menu }: Props) {
  return (
    <div className="flex h-full">
      <section className="flex-none max-w-xs w-96 bg-background p-4 h-full">
        {menu}
      </section>
      <main className="shrink w-full h-full">{children}</main>
    </div>
  )
}
