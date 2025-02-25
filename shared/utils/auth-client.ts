import { createAuthClient } from "better-auth/vue"
import { options } from "~/lib"

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000/",
	...options,
})
