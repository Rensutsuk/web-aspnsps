import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export type AdminRole = "SYSADMIN" | "BLOG_ADMIN";

type BootstrapConfig = {
  email?: string;
  password?: string;
  name: string;
};

function getBootstrapConfig(): BootstrapConfig {
  return {
    email: process.env.SYSADMIN_EMAIL?.trim().toLowerCase() || process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase(),
    password: process.env.SYSADMIN_PASSWORD?.trim() || process.env.INITIAL_ADMIN_PASSWORD?.trim(),
    name: process.env.SYSADMIN_NAME?.trim() || "System Administrator",
  };
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function ensureSeedSysAdmin() {
  const existingSysAdmin = await prisma.adminUser.findFirst({
    where: { role: "SYSADMIN" },
    select: { id: true },
  });

  if (existingSysAdmin) {
    return;
  }

  const config = getBootstrapConfig();
  if (!config.email || !config.password) {
    return;
  }

  try {
    await prisma.adminUser.create({
      data: {
        email: config.email,
        name: config.name,
        passwordHash: await hashPassword(config.password),
        role: "SYSADMIN",
      },
    });
  } catch {
    // Ignore races during first-run bootstrapping.
  }
}

export async function getBootstrapStatus() {
  await ensureSeedSysAdmin();

  const sysAdminCount = await prisma.adminUser.count({
    where: { role: "SYSADMIN" },
  });

  const config = getBootstrapConfig();
  return {
    hasSysAdmin: sysAdminCount > 0,
    isEnvConfigured: Boolean(config.email && config.password),
  };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ensureSeedSysAdmin();

        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          return null;
        }

        const admin = await prisma.adminUser.findUnique({
          where: { email },
        });

        if (!admin || !admin.isActive) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
        if (!passwordMatches) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name ?? admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.role =
          token.role === "SYSADMIN" || token.role === "BLOG_ADMIN" ? token.role : "BLOG_ADMIN";
      }

      return session;
    },
  },
};

export function auth() {
  return getServerSession(authOptions);
}

export async function getCurrentAdmin() {
  await ensureSeedSysAdmin();
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: session.user.email.toLowerCase() },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  if (!admin?.isActive) {
    return null;
  }

  return admin;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}

export async function requireBlogManager() {
  const admin = await requireAdmin();

  if (admin.role !== "SYSADMIN" && admin.role !== "BLOG_ADMIN") {
    redirect("/admin/login");
  }

  return admin;
}

export async function requireSysAdmin() {
  const admin = await requireAdmin();

  if (admin.role !== "SYSADMIN") {
    redirect("/admin");
  }

  return admin;
}

export function getRoleLabel(role: AdminRole) {
  return role === "SYSADMIN" ? "Administrator" : "Editor";
}
