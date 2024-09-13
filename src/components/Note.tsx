import dayjs from 'dayjs'
import NotePreview from '@/components/NotePreview'
import EditButton from '@/components/EditButton'
import { Card } from './shadcn/card'

export default function Note({ noteId, note }: { noteId: string; note: any }) {
  const { title, content, updateTime } = note

  return (
    <Card className="mt-[100px] mb-[40px] mx-[40px] p-[40px] flex-1">
      <div className="flex items-center">
        <h1 className="font-bold text-[30px]">{title}</h1>
        <small className="text-[14px] text-gray-500 ml-[200px] mr-auto">
          Last updated on {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
        </small>
        <EditButton noteId={noteId}>Edit</EditButton>
      </div>
      <NotePreview>{content}</NotePreview>
    </Card>
  )
}
