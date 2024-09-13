import SidebarNoteItem from '@/components/SidebarNoteItem'
import { Note } from '@prisma/client'

export default async function NoteList({ list }: { list: Note[] }) {
  if (list.length == 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>
  }
  return (
    <ul className="notes-list">
      {list.map((note) => {
        return (
          <li key={note.id}>
            <SidebarNoteItem noteId={note.id} note={note} />
          </li>
        )
      })}
    </ul>
  )
}
