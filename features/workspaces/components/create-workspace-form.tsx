"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateWorkspace } from "../api/use-create-workspace"
import { useRef } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { ImageIcon, Router } from "lucide-react"
import { createWorkspaceSchema } from "../schema"
import { useRouter } from "next/navigation"

interface CreateWorkspacesFormProps {
    onCancel?: () => void
}

export const CreateWorkspacesForm = ({ onCancel }: CreateWorkspacesFormProps) => {
    const router = useRouter()
    const { mutate } = useCreateWorkspace()
    const inputRef = useRef<HTMLInputElement>(null)
    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
            image: ""
        }
    })

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : ""
        }
        mutate({ form: finalValues }, {
            onSuccess: ({data}) => {
                form.reset()
                router.push(`/workspaces/${data.id}`)
            }
        }
        )
        
    }
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            form.setValue("image", file)
        }
    }

    return (
        <Card className="h-full w-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a workspaces
                </CardTitle>
            </CardHeader>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Workspace Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter Workspaces Name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            {field.value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image
                                                       alt="logo"
                                                       fill
                                                       className="object-cover"
                                                       src={
                                                        field.value instanceof File
                                                        ? URL.createObjectURL(field.value)
                                                        : field.value
                                                       }
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar>
                                                    <AvatarFallback>
                                                        <ImageIcon className="size[36px]"/>
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p>Jpeg, png, Jpg</p>
                                                <input className="hidden"
                                                  type="file"
                                                  accept=".jpeg, .png, .svg"
                                                  ref={inputRef} 
                                                  onChange={handleImageChange}                                     
                                                 />
                                                  <Button
                                                    type="button"
                                                    onClick={() => inputRef.current?.click()}
                                                  >
                                                    Upload Image
                                                  </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                            <div className="flex items-center justify-between">
                                <Button onClick={onCancel} type="button">
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Create Workspace
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}