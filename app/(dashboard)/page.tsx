import { getCurrentUser } from "@/features/auth/action"
import { CreateWorkspacesForm } from "@/features/workspaces/components/create-workspace-form"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }
  return (
  <div>
    <CreateWorkspacesForm/>
  </div>
  )
}

