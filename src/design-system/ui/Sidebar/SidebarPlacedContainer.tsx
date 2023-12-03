'use client'

type Props = {
  children: React.ReactNode
  menu: React.ReactNode
}

export default function SidebarPlacedContainer({ children, menu }: Props) {
  return (
    <div className="flex h-screen border border-green-400">
      <section className="w-96 max-w-xs flex-none bg-background p-4">
        {menu}
      </section>
      <main className="h-min min-h-0 w-full overflow-x-auto border border-pink-400">
        {children}
      </main>
    </div>
  )
}
