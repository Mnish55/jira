"use server"

import { cookies } from "next/headers"
import { AUTH_COOKIE } from "./constants"
import { Account, Client } from "node-appwrite"

export const getCurrentUser = async () => {
    try {
    const client = new Client()
     .setEndpoint("https://cloud.appwrite.io/v1")
     .setProject("672731ec0023b4f444d9")
     
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
