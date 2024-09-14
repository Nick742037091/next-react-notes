'use client'

import { useEffect, useState } from 'react'
import NotePreview from '@/components/NotePreview'
import { useFormState } from 'react-dom'
import { deleteNote, saveNote } from '../app/actions'
import SaveButton from '@/components/SaveButton'
import DeleteButton from '@/components/DeleteButton'
import { Input } from './shadcn/input'
import { Textarea } from './shadcn/textarea'
import { Card } from './shadcn/card'
import { Badge } from './shadcn/badge'
import eventBus from '@/lib/events/eventBus'
import { EVENT_UPDATE_NODE_LIST } from '@/lib/events'

const initialState = {
  message: '',
  errors: []
}

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody
}: {
  noteId: string | null
  initialTitle: string
  initialBody: string
}) {
  const [saveState, saveFormAction] = useFormState(saveNote, initialState)
  const [delState, delFormAction] = useFormState(deleteNote, initialState)

  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)

  const isDraft = !noteId

  useEffect(() => {
    if (saveState.errors.length) {
      // 处理错误
      console.log(saveState.errors)
    } else {
      eventBus.emit(EVENT_UPDATE_NODE_LIST)
    }
  }, [saveState])
  useEffect(() => {
    if (delState.errors.length) {
      console.log(delState.errors)
    } else {
      eventBus.emit(EVENT_UPDATE_NODE_LIST)
    }
  }, [delState])

  return (
    <Card className="mt-[100px] mb-[40px] mx-[40px] p-[40px] flex-1 flex">
      <form autoComplete="off">
        <div className="flex w-[400px]  justify-end">
          <input type="hidden" name="noteId" value={noteId || ''} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="mt-[8px]">
          {saveState?.message}
          {saveState.errors[0]?.message}
          {delState?.message}
          {delState.errors[0]?.message}
        </div>
        <div className="mt-[16px]">
          <label className="offscreen" htmlFor="note-title-input">
            Enter a title for your note
          </label>
          <Input
            id="note-title-input"
            type="text"
            name="title"
            value={title || ''}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
        </div>
        <div className="mt-[16px]">
          <label className="offscreen" htmlFor="note-body-input">
            Enter the body for your note
          </label>
          <Textarea
            name="body"
            value={body}
            id="note-body-input"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </form>
      <div className="flex-1 ml-[40px] border-l-[1px] border-gray-300 pl-[40px]">
        <Badge className="text-[20px]">Preview</Badge>
        <h1 className="text-[20px] mt-[40px]">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </Card>
  )
}
