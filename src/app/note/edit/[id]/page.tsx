import NoteEditor from '@/components/NoteEditor'
import SideBarWrapper from '@/components/SideBarWrapper'
import { getNote } from '@/lib/prisma'

export default async function EditPage({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { page: string }
}) {
  const noteId = params.id
  const note = await getNote(noteId)
  const page = parseInt(searchParams.page) || 1
  // 让效果更明显

  if (note === null) {
    return (
      <SideBarWrapper page={page} pagePath={`/note/edit/${noteId}`}>
        <div className="p-[20px] text-[28px]">
          Click a note on the left to view something! 🥺
        </div>
      </SideBarWrapper>
    )
  }

  return (
    <SideBarWrapper page={page} pagePath={`/note/edit/${noteId}`}>
      <div className="h-full flex flex-col">
        <NoteEditor
          noteId={noteId}
          initialTitle={note.title}
          initialBody={note.content}
        />
      </div>
    </SideBarWrapper>
  )
}
