import { createBetterAuth } from '../utils/auth'

export default defineEventHandler(async (event) => {
	const auth = await createBetterAuth()
	return auth.handler(toWebRequest(event))
})
