import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { prisma } from './prisma'

// TODO cache何时更新
export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/auth/signin')
  }
  const user = await prisma.user.findFirst({
    where: {
      id: session.userId
    },
    select: {
      id: true,
      username: true
    }
  })
  if (!user) {
    redirect('/auth/signin')
  }

  return { isAuth: true, user }
})

export const getProfile = cache(async () => {
  const cookie = cookies().get('session')?.value
  if (cookie) {
    const session = await decrypt(cookie)
    if (!session?.userId) return null
    return await prisma.user.findFirst({
      where: {
        id: session.userId
      }
    })
  }
  return null
})
