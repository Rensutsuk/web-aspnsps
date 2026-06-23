import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "SYSADMIN" | "BLOG_ADMIN";
    };
  }

  interface User {
    role: "SYSADMIN" | "BLOG_ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "SYSADMIN" | "BLOG_ADMIN";
  }
}
