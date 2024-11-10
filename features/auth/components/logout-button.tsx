"use client"
import { Button } from "@/components/ui/button"
import { useLogout } from "../api/use-logout"

export const LogoutButton = () => {
    const { mutate } = useLogout()
    return (
        <Button className="bg-amber-500" onClick={() => mutate()}>
            Logout
        </Button>
    )
}