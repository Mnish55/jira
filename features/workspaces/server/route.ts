import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { BUCKET_ID, COLLECTION_ID, DATABASE_ID } from "@/app/config";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases")

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID
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
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
           name,
           userId: user.$id,
           imageUrl: uploadedImageUrl
        }       
      )

      return c.json({ data: workspace})

    }
  )

export default app