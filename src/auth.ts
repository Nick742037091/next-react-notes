import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { addUser, getUser } from './lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // 登陆信息验证
        const { user, result } = await getUser(
          credentials.username as string,
          credentials.password as string
        )

        // 密码错误
        if (result === 2) return null

        // 用户注册
        if (result === 1) {
          return await addUser(
            credentials.username as string,
            credentials.password as string
          )
        }

        if (!user) {
          throw new Error('User was not found and could not be created.')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname.startsWith('/note/edit')) return !!auth
      return true
    },
    async jwt({ token, user, account }) {
      if (account && account.type === 'credentials' && user) {
        token.userId = (user as any).userId
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.userId as string
      return session
    }
  }
})
