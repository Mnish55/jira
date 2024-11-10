import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/rpc"

export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => {
           const response = await client.api.workspaces.$get()
           console.log(response)

           if (!response.ok) {
            throw new Error("Fail to fetch workpspaces")
           }
           const { data } = await response.json()
           return data
        }
    })

    return query
}