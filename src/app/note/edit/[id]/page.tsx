import NoteEditor from '@/components/NoteEditor'
import { getNote } from '@/lib/prisma'

export default async function EditPage({ params }: { params: { id: string } }) {
  const noteId = params.id
  const note = await getNote(noteId)

  // 让效果更明显

  if (note === null) {
    return (
      <div className="p-[20px] text-[28px]">
        Click a note on the left to view something! 🥺
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <NoteEditor
        noteId={noteId}
        initialTitle={note.title}
        initialBody={note.content}
      />
    </div>
  )
}
