"use client"

import { ResponsiveModal } from "@/components/responsive-modal"
import { CreateWorkspacesForm } from "./create-workspace-form"
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal"

export const CreateWorkspaceMdoal = () => {
    const {isOpen, setIsOpen} = useCreateWorkspaceModal()
    return (
        <ResponsiveModal onOpenChange={setIsOpen} open={isOpen}>
            <CreateWorkspacesForm/>
        </ResponsiveModal>
    )
}