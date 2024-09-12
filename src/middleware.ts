import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/session'

const publicRoutes = ['/auth/signin']

export default async function middleware(req: NextRequest) {
  const redirectToLogin = () => {
    return NextResponse.redirect(
      new URL(process.env.BASE_PATH + '/auth/signin', req.nextUrl)
    )
  }
  const next = () => NextResponse.next()

  // 如果路径是公共路径，则直接跳过
  if (publicRoutes.includes(req.nextUrl.pathname)) return next()

  const cookie = req.cookies.get('session')?.value
  if (!cookie) return redirectToLogin()
  const session = await decrypt(cookie)
  if (!session?.userId) return redirectToLogin()
  return next()
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$).*)']
}
