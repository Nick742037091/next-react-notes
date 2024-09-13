import Link from 'next/link'
import { Button } from './shadcn/button'

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
        role="menuitem"
      >
        {children}
      </Button>
    </Link>
  )
}
