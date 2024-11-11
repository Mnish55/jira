import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";
import { cors } from 'hono/cors'


const app = new Hono()
   .use('/api/*', cors())
   .use(
  '/login',
  cors({
    origin: 'https://urban-barnacle-x6xq669w76hp975-3000.app.github.dev',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

  .get("/current", sessionMiddleware, async (c) => {
    const user = c.get("user")
    return c.json({data: user})
  })
  .post("/login",
  zValidator("json", loginSchema),
  async (c) => {
     const {email, password} = c.req.valid("json")
     const { account } = await createAdminClient();
     const session = await account.createEmailPasswordSession(email, password);
     setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30
    });
     console.log({email, password})
    return c.json({success: true})
  })
  .post("/register",
    zValidator("json", registerSchema),
    async (c) => {
       const {name, email, password} = c.req.valid("json")
       const { account } = await createAdminClient();
       await account.create(
        ID.unique(),
        email,
        password,
        name
       )
       const session = await account.createEmailPasswordSession(email, password);
       setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 30
      });
       console.log({name, email, password})
      return c.json({success: true})
    })
    .post("/logout", sessionMiddleware,  async (c) => {
       const account = c.get("account")
       deleteCookie(c, AUTH_COOKIE)
       await account.deleteSession("current")
       return c.json({success: true})
    })

export default app