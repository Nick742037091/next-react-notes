import Note from '@/components/Note'
import { getNote } from '@/lib/prisma'

export default async function Page({ params }: { params: { id: string } }) {
  // 动态路由 获取笔记 id
  const noteId = params.id
  const note = await getNote(noteId)

  if (note == null) {
    return (
      <div className="p-[20px] text-[28px]">
        Click a note on the left to view something! 🥺
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Note noteId={noteId} note={note} />
    </div>
  )
}
