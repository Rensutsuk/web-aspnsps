import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.startsWith("/admin/login")) {
        return true;
      }

      return Boolean(token);
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
