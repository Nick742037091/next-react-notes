import Sidebar from '@/components/Sidebar'

export default function NoteLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-[100vh] flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
