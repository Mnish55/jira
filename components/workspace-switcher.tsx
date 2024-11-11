"use client"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"
import { RiAddCircleFill} from "react-icons/ri"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal"
  

export const WorkSpaceSwitcher = () => {
    const {open} = useCreateWorkspaceModal()
    const router = useRouter()
    const workspaceId = useWorkspaceId()
    const { data: workspaces } = useGetWorkspaces()

    const onSelect = (id: string) => {
        router.push(`/workspaces/${id}`)
    }
    
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500 font-bold">Workspaces</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-poninter hover:opacity-75 transition"/>
            </div>
            <Select onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                    <SelectValue placeholder="No workspaces selected"/>
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem key={workspace.$id} value={workspace.$id}>
                           {workspace.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}