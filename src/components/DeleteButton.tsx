import { useFormStatus } from 'react-dom'
import cross from '@/assets/icon/cross.svg'
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
        <img
          src={cross}
          width="10px"
          height="10px"
          alt=""
          role="presentation"
        />
        Delete
      </button>
    )
  )
}
