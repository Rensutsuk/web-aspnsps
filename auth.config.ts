import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname

      if (pathname.startsWith('/admin/login')) {
        return true
      }

      return !!auth?.user
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }

      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === 'string' ? token.id : ''
        session.user.role =
          token.role === 'SYSADMIN' || token.role === 'BLOG_ADMIN' ? token.role : 'BLOG_ADMIN'
      }

      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
