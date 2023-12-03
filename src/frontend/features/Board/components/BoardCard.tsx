export default function BoardCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border border-dashed border-orange-500 p-8">
      {children}
    </div>
  )
}
