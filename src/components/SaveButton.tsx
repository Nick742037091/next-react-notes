import { useFormStatus } from 'react-dom'
import { MdSave } from 'react-icons/md'
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
      <MdSave className="mr-[8px]" />
      {pending ? 'Saving' : 'Done'}
    </button>
  )
}
