import { useFormStatus } from 'react-dom'
import { MdDelete } from 'react-icons/md'
export default function DeleteButton({
  isDraft,
  formAction
}: {
  isDraft: boolean
  formAction: any
}) {
  const { pending } = useFormStatus()
  return (
    !isDraft && (
      <button
        className="note-editor-delete"
        disabled={pending}
        formAction={formAction}
        role="menuitem"
      >
        <MdDelete className="mr-[8px]" />
        Delete
      </button>
    )
  )
}
