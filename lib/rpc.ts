import { AppType } from '@/app/api/[[...route]]/route'
import { hc } from 'hono/client'

export const client = hc<AppType>("https://urban-barnacle-x6xq669w76hp975-3000.app.github.dev")

