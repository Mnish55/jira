import { getCurrentUser } from "@/features/auth/action"
import { getWorkspaces } from "@/features/workspaces/action"
import { CreateWorkspacesForm } from "@/features/workspaces/components/create-workspace-form"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getCurrentUser()
  
  if (!user) redirect("/")

  const workspace = await getWorkspaces()

  if (workspace.total === 0 ) {
    redirect("/workspaces/create")
  } else {
    redirect(`/workspaces/${workspace.documents[0].$id}`)
  }
}

