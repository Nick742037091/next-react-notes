import Link from 'next/link'
import { Button } from './shadcn/button'
import { MdAdd, MdEdit } from 'react-icons/md'

export default function EditButton({
  noteId,
  children
}: {
  noteId: string | null
  children: React.ReactNode
}) {
  const isDraft = noteId == null
  return (
    <Link href={`/note/edit/${noteId || ''}`} className="link--unstyled">
      <Button
        className={[
          isDraft ? 'edit-button--solid' : 'edit-button--outline'
        ].join(' ')}
      >
        <span className="mr-[6px]">{isDraft ? <MdAdd /> : <MdEdit />}</span>
        {children}
      </Button>
    </Link>
  )
}
