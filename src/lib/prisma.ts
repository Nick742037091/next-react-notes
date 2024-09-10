import { PrismaClient } from '@prisma/client'
import { auth } from '@/auth'

export const prisma = new PrismaClient()

export async function getAllNotes() {
  // 查找登录用户的笔记
  const notes = await prisma.note.findMany({})
  // 构造返回数据
  const res: { [key: string]: string } = {}
  notes.forEach(({ title, content, id, updatedAt }) => {
    res[id] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })
  return res
}

export async function addNote(data: string) {
  const session = await auth()
  const result = await prisma.note.create({
    data: {
      title: JSON.parse(data).title,
      content: JSON.parse(data).content,
      author: { connect: { id: session?.user?.id } }
    }
  })

  return result.id
}

export async function updateNote(uuid: string, data: string) {
  const parsedData = JSON.parse(data)
  await prisma.note.update({
    where: {
      id: uuid
    },
    data: {
      title: parsedData.title,
      content: parsedData.content
    }
  })
}

export async function getNote(uuid: string) {
  const note = await prisma.note.findFirst({
    where: {
      id: uuid
    }
  })
  if (note == null) return null

  return {
    title: note?.title,
    content: note?.content || '',
    updateTime: note?.updatedAt,
    id: note?.id || ''
  }
}

export async function delNote(uuid: string) {
  await prisma.note.delete({
    where: {
      id: uuid
    }
  })
}

export async function addUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: []
      }
    }
  })

  return {
    name: username,
    username,
    userId: user.id
  }
}

export async function getUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      notes: true
    }
  })
  if (!user) {
    return {
      user: null,
      result: 1
    }
  }

  if (user.password !== password) {
    return {
      user: null,
      result: 2
    }
  }

  return {
    user: {
      name: username,
      username,
      userId: user.id
    },
    result: 0
  }
}

export default prisma
