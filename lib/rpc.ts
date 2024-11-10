import { AppType } from '@/app/api/[[...route]]/route'
import { hc } from 'hono/client'

export const client = hc<AppType>("https://3000-mnish55-jira-obq1g8rd2mu.ws-us116.gitpod.io")

