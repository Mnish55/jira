import { cn } from "@/lib/utils"
import { SettingsIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go"
import { WorkSpaceSwitcher } from "./workspace-switcher"

const routes = [
    {
        label: "Home",
        href: "home",
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon
    },
    {
        label: "Members",
        href: "/members",
        icon: UsersIcon,
        activeIcon: UsersIcon
    }
]
export const Sidebar = () => {
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <WorkSpaceSwitcher/>
            <div className="flex flex-col">
                {routes.map((item) => {
                    const isActive = false
                    const Icon = isActive ? item.activeIcon : item.icon
                    return (
                        <Link href={item.href} key={item.label}>
                            <div className={cn("flex items-center gap-2.5 p-2.5 rouded-md font-medium hover:text-primary transition text-neutral-500", isActive && "bg-white shadow-sm hover:opacity-100 text-primary")}>
                                <Icon className="size-5 text-neutral-500"/>
                                {item.label}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </aside>
    )
}