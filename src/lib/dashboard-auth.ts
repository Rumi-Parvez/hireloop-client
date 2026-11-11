import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export type UserRole = "jobSeeker" | "employer" | "admin";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session.user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await getCurrentUser();

  // Verify the role from the database.
  // Do not trust a role supplied by the browser.

  const role = user.role as UserRole;

  if (!allowedRoles.includes(role)) {
    if (role === "jobSeeker") {
      redirect("/dashboard/job-seeker");
    }

    if (role === "employer") {
      redirect("/dashboard/employer");
    }

    if (role === "admin") {
      redirect("/dashboard/admin");
    }

    redirect("/login");
  }

  return user;
}
