'use server'

import prisma, { addNote, updateNote, delNote, addUser } from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, '请填写标题'),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
})

export async function login(username: string, password: string) {
  let user = await prisma.user.findFirst({
    where: {
      username: username
    }
  })
  if (!user) {
    const res = await addUser(username, password)
    user = {
      username,
      password,
      id: res.id
    }
  } else {
    if (user.password !== password) {
      return {
        message: '用户名或密码错误',
        data: null,
        code: -1
      }
    }
  }

  await createSession(user.id, user.username)

  return {
    message: '登录成功',
    data: user,
    code: 0
  }
}

export async function logout() {
  await deleteSession()
}

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
    redirect('/')
  } catch (error) {
    return { message: ``, errors: [{ message: '删除失败' }] }
  }
}
