import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { prisma } from '@/app/db'
import { authConfig } from '@/auth.config'

export type AdminRole = 'SYSADMIN' | 'BLOG_ADMIN'

const sysAdminEnv = {
  email: process.env.SYSADMIN_EMAIL?.trim().toLowerCase(),
  password: process.env.SYSADMIN_PASSWORD?.trim(),
  name: process.env.SYSADMIN_NAME?.trim() || 'System Administrator',
}

async function ensureSeedSysAdmin() {
  const existingSysAdmin = await prisma.adminUser.findFirst({
    where: { role: 'SYSADMIN' },
    select: { id: true },
  })

  if (existingSysAdmin) return

  if (!sysAdminEnv.email || !sysAdminEnv.password) return

  const passwordHash = await bcrypt.hash(sysAdminEnv.password, 12)

  try {
    await prisma.adminUser.create({
      data: {
        email: sysAdminEnv.email,
        name: sysAdminEnv.name,
        passwordHash,
        role: 'SYSADMIN',
      },
    })
  } catch {
    // Ignore races during first bootstrapping.
  }
}

export async function getBootstrapStatus() {
  await ensureSeedSysAdmin()

  const hasSysAdmin = await prisma.adminUser.count({
    where: { role: 'SYSADMIN' },
  })

  return {
    hasSysAdmin: hasSysAdmin > 0,
    isEnvConfigured: !!sysAdminEnv.email && !!sysAdminEnv.password,
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        await ensureSeedSysAdmin()

        const email = String(credentials?.email ?? '')
          .trim()
          .toLowerCase()
        const password = String(credentials?.password ?? '')

        if (!email || !password) {
          return null
        }

        const admin = await prisma.adminUser.findUnique({
          where: { email },
        })

        if (!admin || !admin.isActive) {
          return null
        }

        const isValid = await bcrypt.compare(password, admin.passwordHash)
        if (!isValid) {
          return null
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name ?? admin.email,
          role: admin.role,
        }
      },
    }),
  ],
})

export async function getCurrentAdmin() {
  await ensureSeedSysAdmin()
  const session = await auth()

  if (!session?.user?.email) return null

  const admin = await prisma.adminUser.findUnique({
    where: { email: session.user.email.toLowerCase() },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
    },
  })

  if (!admin?.isActive) return null

  return admin
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect('/admin/login')
  }

  return admin
}

export async function requireBlogManager() {
  const admin = await requireAdmin()

  if (admin.role !== 'SYSADMIN' && admin.role !== 'BLOG_ADMIN') {
    redirect('/admin/login')
  }

  return admin
}

export async function requireSysAdmin() {
  const admin = await requireAdmin()

  if (admin.role !== 'SYSADMIN') {
    redirect('/admin/blogs')
  }

  return admin
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}
