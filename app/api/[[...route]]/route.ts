import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import auth from "@/features/auth/server/route"
//this line check the previos code who is show the error 400 bad request
import workspaces from "@/features/workspaces/server/route"

export const runtime = 'edge'

const app = new Hono().basePath('/api')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
   .route("/auth", auth)
   .route("/workspaces", workspaces)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes