import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { BUCKET_ID, COLLECTION_ID, DATABASE_ID } from "@/app/config";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "@/features/members/types";
import { generateInviteCode } from "@/lib/utils";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user")
    const databases = c.get("databases")

    const members = await databases.listDocuments(
     "672a453b0002c6ff7acd",
     "6730e950002540d767d8",
     [Query.equal("userId", user.$id)]
    )

    if (members.total === 0) {
      return c.json({ data: {documents: [], total: 0}})
    }
    
    const workspaceIds = members.documents.map((member) => member.workspaceId)

    const workspaces = await databases.listDocuments(
      "672a453b0002c6ff7acd",
      "672a45850036b55c5887",
      [Query.contains("$id", workspaceIds)]
    )

    return c.json({ data: workspaces})
  })
  .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases")
      const storage = c.get("storage")
      const user = c.get("user")
      const { name, image } = c.req.valid("form")

      let uploadedImageUrl: string | undefined

      if (image instanceof File) {
        const file = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          image
        )

        const arrayBuffer = await storage.getFilePreview(
          BUCKET_ID,
          file.$id
        )

        uploadedImageUrl = `data:image/png:base64,${Buffer.from(arrayBuffer).toString("base64")}`
      }


      const workspace = await databases.createDocument(
        "672a453b0002c6ff7acd",
        "672a45850036b55c5887",
        ID.unique(),
        {
           name,
           userId: user.$id,
           imageUrl: uploadedImageUrl,
           inviteCode: generateInviteCode(8)
        }       
      )

      const data = await databases.createDocument(
        "672a453b0002c6ff7acd",
        "6730e950002540d767d8", 
        ID.unique(), {
          userId: user.$id,
          workspaceId: workspace.$id,
          role: MemberRole.ADMIN
        }
      )
      console.log(data)

      return c.json({ data: workspace})

    }
  )

export default app