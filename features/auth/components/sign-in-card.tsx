"use client";

import { DottedSeprator } from "@/components/dotted-seperator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

export const SignInCard = () => {
  const { mutate } = useLogin()
  const pathName = usePathname()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
     mutate({json: values})
  }
  return (
    <Card className="w-full h-full px-4 max-w-[400px] shadow-md items-center flex flex-col">
      <CardHeader>
        <h1 className="text-3xl font-semibold text-center text-blue-600">Welcome</h1>
        <p className="text-sm text-muted-foreground text-center">
          Enter your credentials to access your account
        </p>
      </CardHeader>
      <DottedSeprator />
      <CardContent className="p-5 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <DottedSeprator />
      <CardContent className="p-7 flex flex-col gap-y-4 w-full">
        <Button className="w-full" variant="secondary" size="lg">
          <FcGoogle className="size-5 mr-2" />
          Login with Google
        </Button>
        <Button className="w-full" variant="secondary" size="lg">
          <FaGithub className="size-5 mr-2" />
          Login with Github
        </Button>
      </CardContent>
      <div className="p-4 text-sm">
        <p>Don&apos;t have a account ? &nbsp;
          <Link href={pathName === "sign-in" ? "/sign-in" : "sign-up"}>
            <span className="text-blue-600 hover:underline">SignUp</span>
          </Link>
        </p>
      </div>
    </Card>
  );
};

