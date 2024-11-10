import { getCurrentUser } from "@/features/auth/action"
import { CreateWorkspacesForm } from "@/features/workspaces/components/create-workspace-form"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()
  console.log(user)

  if (!user) {
    redirect("/")
  }
  return (
  <div>
    <CreateWorkspacesForm/>
  </div>
  )
}

