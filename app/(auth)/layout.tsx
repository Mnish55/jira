import { Button } from "@/components/ui/button"

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex items-center justify-between">
                    <div>
                        Image   
                    </div>
                    <Button>
                        Login
                    </Button>
                </nav>
                <div className="pt-7 flex items-center justify-center">
                  {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout