import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { auth, getBootstrapStatus, signIn } from "@/auth";

export const dynamic = "force-dynamic";

async function loginAction(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin/blogs",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/login?error=credentials");
    }

    throw error;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/admin/blogs");
  }

  const params = await searchParams;
  const bootstrap = await getBootstrapStatus();
  const showCredentialsError = params.error === "credentials";

  return (
    <div className="min-h-screen bg-base-100 px-4 pt-24">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Sign In</h1>
          <p className="mt-2 text-base-content/70">
            Sign in with an internal admin account to manage blog content.
          </p>
        </div>

        {showCredentialsError ? (
          <div className="alert alert-error">
            <span>Invalid email or password.</span>
          </div>
        ) : null}

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <form action={loginAction} className="space-y-4">
              <label className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full mb-4"
                  required
                />
              </label>

              <label className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full mb-4"
                  required
                />
              </label>

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Sign In
              </button>
            </form>

            <div className="mt-2 text-center text-sm text-base-content/70">
              <Link href="/" className="link link-hover">
                Back to site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
