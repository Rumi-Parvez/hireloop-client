import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/dashboard-auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  switch (user.role) {
    case "jobSeeker":
      redirect("/dashboard/job-seeker");

    case "employer":
      redirect("/dashboard/employer");

    case "admin":
      redirect("/dashboard/admin");

    default:
      redirect("/login");
  }
}
