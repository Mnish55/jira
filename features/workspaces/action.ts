"use server"

import { cookies } from "next/headers"

import { Account, Client, Databases, Query } from "node-appwrite"
import { AUTH_COOKIE } from "../auth/constants"

export const getWorkspaces = async () => {
    try {
    const client = new Client()
     .setEndpoint("https://cloud.appwrite.io/v1")
     .setProject("672731ec0023b4f444d9")
     
     const cookieStore = await cookies()
     const session = await cookieStore.get(AUTH_COOKIE)

     if (!session) return { documents: [], total: 0} 

     client.setSession(session.value)

     const databases = new Databases(client)
     const account  = new Account(client)
     const user = await account.get()

     const members = await databases.listDocuments(
        "672a453b0002c6ff7acd",
        "6730e950002540d767d8",
        [Query.equal("userId", user.$id)]
       )
   
       if (members.total === 0) {
         return { documents: [], total: 0} 
       }
       
       const workspaceIds = members.documents.map((member) => member.workspaceId)
   
       const workspaces = await databases.listDocuments(
         "672a453b0002c6ff7acd",
         "672a45850036b55c5887",
         [Query.contains("$id", workspaceIds)]
       )

       return workspaces

    } catch (error) {
        console.error(error)
         return { documents: [], total: 0} 
    }
}
