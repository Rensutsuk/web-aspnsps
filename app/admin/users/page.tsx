import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { hashPassword, requireSysAdmin, signOut } from '@/auth'
import { prisma } from '@/app/db'

export const dynamic = 'force-dynamic'

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
}

async function createAdminUser(formData: FormData) {
  'use server'

  await requireSysAdmin()

  const name = String(formData.get('name') ?? '').trim()
  const email = normalizeEmail(formData.get('email'))
  const password = String(formData.get('password') ?? '')
  const role = String(formData.get('role') ?? 'BLOG_ADMIN')

  if (!email || !password || (role !== 'SYSADMIN' && role !== 'BLOG_ADMIN')) {
    redirect('/admin/users?error=invalid')
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } })
  if (existing) {
    redirect('/admin/users?error=exists')
  }

  await prisma.adminUser.create({
    data: {
      name: name || null,
      email,
      passwordHash: await hashPassword(password),
      role,
    },
  })

  revalidatePath('/admin/users')
  redirect('/admin/users?status=created')
}

async function updateAdminUser(formData: FormData) {
  'use server'

  const currentAdmin = await requireSysAdmin()
  const id = String(formData.get('id') ?? '')
  const name = String(formData.get('name') ?? '').trim()
  const role = String(formData.get('role') ?? 'BLOG_ADMIN')
  const isActive = formData.get('isActive') === 'on'
  const newPassword = String(formData.get('newPassword') ?? '')

  if (!id || (role !== 'SYSADMIN' && role !== 'BLOG_ADMIN')) {
    redirect('/admin/users?error=invalid')
  }

  const target = await prisma.adminUser.findUnique({
    where: { id },
    select: { id: true, role: true },
  })

  if (!target) {
    redirect('/admin/users?error=missing')
  }

  if (target.id === currentAdmin.id && (!isActive || role !== 'SYSADMIN')) {
    redirect('/admin/users?error=self-lockout')
  }

  if (target.role === 'SYSADMIN' && (role !== 'SYSADMIN' || !isActive)) {
    const sysAdminCount = await prisma.adminUser.count({
      where: { role: 'SYSADMIN', isActive: true },
    })

    if (sysAdminCount <= 1) {
      redirect('/admin/users?error=last-sysadmin')
    }
  }

  await prisma.adminUser.update({
    where: { id },
    data: {
      name: name || null,
      role,
      isActive,
      ...(newPassword ? { passwordHash: await hashPassword(newPassword) } : {}),
    },
  })

  revalidatePath('/admin/users')
  redirect('/admin/users?status=updated')
}

async function deleteAdminUser(formData: FormData) {
  'use server'

  const currentAdmin = await requireSysAdmin()
  const id = String(formData.get('id') ?? '')

  if (!id) {
    redirect('/admin/users?error=invalid')
  }

  const target = await prisma.adminUser.findUnique({
    where: { id },
    select: { id: true, role: true },
  })

  if (!target) {
    redirect('/admin/users?error=missing')
  }

  if (target.id === currentAdmin.id) {
    redirect('/admin/users?error=self-delete')
  }

  if (target.role === 'SYSADMIN') {
    const sysAdminCount = await prisma.adminUser.count({
      where: { role: 'SYSADMIN' },
    })

    if (sysAdminCount <= 1) {
      redirect('/admin/users?error=last-sysadmin')
    }
  }

  await prisma.adminUser.delete({
    where: { id },
  })

  revalidatePath('/admin/users')
  redirect('/admin/users?status=deleted')
}

async function logoutAction() {
  'use server'

  await signOut({ redirectTo: '/admin/login' })
}

const messageMap: Record<string, { type: 'success' | 'error'; text: string }> = {
  created: { type: 'success', text: 'Admin account created.' },
  updated: { type: 'success', text: 'Admin account updated.' },
  deleted: { type: 'success', text: 'Admin account deleted.' },
  invalid: { type: 'error', text: 'Please complete all required fields.' },
  exists: { type: 'error', text: 'An account with that email already exists.' },
  missing: { type: 'error', text: 'The selected account no longer exists.' },
  'self-lockout': { type: 'error', text: 'You cannot remove your own sysadmin access or disable your account.' },
  'self-delete': { type: 'error', text: 'You cannot delete your own account.' },
  'last-sysadmin': { type: 'error', text: 'At least one active sysadmin must remain.' },
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; error?: string }>
}) {
  const currentAdmin = await requireSysAdmin()
  const params = await searchParams

  const admins = await prisma.adminUser.findMany({
    orderBy: [{ role: 'asc' }, { email: 'asc' }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  const feedbackKey = params.error ?? params.status
  const feedback = feedbackKey ? messageMap[feedbackKey] : null

  return (
    <div className="container mx-auto mt-12 px-4 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Accounts</h1>
          <p className="opacity-70">
            Signed in as {currentAdmin.name ?? currentAdmin.email}. Sysadmins can manage blog admins
            and other sysadmins.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/blogs" className="btn btn-ghost">
            Back to Blogs
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="btn btn-outline">
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {feedback ? (
        <div className={`alert mb-6 ${feedback.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          <span>{feedback.text}</span>
        </div>
      ) : null}

      <div className="mb-8 card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Create Admin Account</h2>
          <form action={createAdminUser} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input name="name" className="input input-bordered" placeholder="Optional display name" />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input name="email" type="email" className="input input-bordered" required />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Temporary Password</span>
              </div>
              <input name="password" type="password" className="input input-bordered" required />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Role</span>
              </div>
              <select name="role" className="select select-bordered" defaultValue="BLOG_ADMIN">
                <option value="BLOG_ADMIN">Blog Admin</option>
                <option value="SYSADMIN">Sysadmin</option>
              </select>
            </label>

            <div className="md:col-span-2 xl:col-span-4">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        {admins.map((admin) => (
          <div key={admin.id} className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="card-title">{admin.name || admin.email}</h2>
                  <p className="text-sm opacity-70">{admin.email}</p>
                  <p className="text-xs opacity-50">
                    Created {admin.createdAt.toISOString().slice(0, 10)} | Updated{' '}
                    {admin.updatedAt.toISOString().slice(0, 10)}
                  </p>
                </div>
                <div className="badge badge-outline">{admin.role === 'SYSADMIN' ? 'Sysadmin' : 'Blog Admin'}</div>
              </div>

              <form action={updateAdminUser} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <input type="hidden" name="id" value={admin.id} />

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Name</span>
                  </div>
                  <input name="name" className="input input-bordered" defaultValue={admin.name ?? ''} />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Role</span>
                  </div>
                  <select name="role" className="select select-bordered" defaultValue={admin.role}>
                    <option value="BLOG_ADMIN">Blog Admin</option>
                    <option value="SYSADMIN">Sysadmin</option>
                  </select>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">New Password</span>
                  </div>
                  <input
                    name="newPassword"
                    type="password"
                    className="input input-bordered"
                    placeholder="Leave blank to keep current"
                  />
                </label>

                <label className="form-control justify-end">
                  <div className="label">
                    <span className="label-text">Active</span>
                  </div>
                  <input
                    name="isActive"
                    type="checkbox"
                    className="toggle toggle-primary"
                    defaultChecked={admin.isActive}
                  />
                </label>

                <div className="flex items-end gap-2">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>

              <div className="mt-4 flex justify-end">
                <form action={deleteAdminUser}>
                  <input type="hidden" name="id" value={admin.id} />
                  <button type="submit" className="btn btn-error btn-outline">
                    Delete Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
