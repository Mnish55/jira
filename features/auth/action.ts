"use server"

import { cookies } from "next/headers"
import { AUTH_COOKIE } from "./constants"
import { Account, Client } from "node-appwrite"

export const getCurrentUser = async () => {
    try {
    const client = new Client()
     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
     
     const cookieStore = await cookies()
     const session = await cookieStore.get(AUTH_COOKIE)

     if (!session) return null

     client.setSession(session.value)

     const account = new Account(client)

     return account.get()
    } catch (error) {
        console.error(error)
        return null
    }
}
