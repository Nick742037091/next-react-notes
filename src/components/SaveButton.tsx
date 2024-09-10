import { useFormStatus } from 'react-dom'
import checkmark from '@/assets/icon/checkmark.svg'

export default function SaveButton({ formAction }: { formAction: any }) {
  const { pending } = useFormStatus()
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <img
        src={checkmark}
        width="14px"
        height="10px"
        alt=""
        role="presentation"
      />
      {pending ? 'Saving' : 'Done'}
    </button>
  )
}
