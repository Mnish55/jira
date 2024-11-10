import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>

export const useCreateWorkspace = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({form}) => {
            const response = await client.api.workspaces["$post"]({form})
            return await response.json()
        },
        onSuccess: () => {
            router.refresh()
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
        },
        onError: (error) => {
            console.log("Error response:", error);
            throw new Error("Something went wrong");
        },
    })
    return mutation
}
