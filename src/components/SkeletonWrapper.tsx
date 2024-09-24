import { ScrollArea } from './shadcn/scroll-area'
import NoteListSkeleton from './NoteListSkeleton'

export default function SiderBarSkeletonWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-[100vh] flex">
      <ScrollArea className="sidebar mt-[100px] box-border">
        <NoteListSkeleton />
      </ScrollArea>
      <div className="flex-1 p-4">
        <div className="animate-pulse">{children}</div>
      </div>
    </div>
  )
}
