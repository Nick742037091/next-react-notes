'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

import { z } from 'zod'
import { error } from 'console'

const schema = z.object({
  title: z.string().min(1, '请填写标题'),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
})

export async function saveNote(prevState: any, formData: FormData) {
  const noteId = formData.get('noteId')
  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  }

  // 校验数据
  const validated = schema.safeParse(data)
  if (!validated.success) {
    return {
      errors: validated.error.issues
    }
  }

  if (noteId) {
    updateNote(noteId as string, JSON.stringify(data))
    revalidatePath('/', 'layout')
  } else {
    const res = await addNote(JSON.stringify(data))
    revalidatePath('/', 'layout')
  }
  return { message: `添加成功`, errors: [] }
}

export async function deleteNote(prevState: any, formData: FormData) {
  try {
    const noteId = formData.get('noteId')
    delNote(noteId as string)
    revalidatePath('/', 'layout')
    return { message: `删除成功`, errors: [] }
  } catch (error) {
    return { message: ``, errors: [{ message: '删除失败' }] }
  }
}
