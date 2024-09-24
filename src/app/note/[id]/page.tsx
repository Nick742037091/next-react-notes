import Note from '@/components/Note'
import { getNote } from '@/lib/prisma'
import SideBarWrapper from '@/components/SideBarWrapper'
export default async function Page({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { page: string }
}) {
  // 动态路由 获取笔记 id
  const noteId = params.id
  const note = await getNote(noteId)
  const page = parseInt(searchParams.page) || 1
  if (note == null) {
    return (
      <SideBarWrapper page={page} pagePath={`/note/${page}`}>
        <div className="p-[20px] text-[28px]">
          Click a note on the left to view something! 🥺
        </div>
      </SideBarWrapper>
    )
  }

  return (
    <SideBarWrapper page={page} pagePath={`/note/${page}`}>
      <div className="h-full flex flex-col">
        <Note noteId={noteId} note={note} />
      </div>
    </SideBarWrapper>
  )
}
