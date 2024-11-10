"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useCurrent } from "../api/use-current"
import { Loader } from "lucide-react"

export const UserButton = () => {
    const {data: user, isLoading} = useCurrent()

    if (!user) {
        return null
    }
    const { name, email } = user

    const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U"

    if (isLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-200">
              <Loader className="size-4 animate-spin text-muted-foreground"/>
            </div>
        )
    }
    return (
      <Avatar className="size-10 hover:opacity-75 transition border border-neutral-200">
        <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
           {avatarFallback}
        </AvatarFallback>
      </Avatar>
    )
}