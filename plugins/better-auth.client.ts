import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'
import { options } from '~/lib'

export default defineNuxtPlugin(() => {
	const conf = useAppConfig()

	const plugins = options.plugins ?? []

	const authClient = createAuthClient({
		baseURL: conf.betterAuth.baseUrl,
		...options,
		plugins: [...plugins, adminClient()],
	})

	return {
		provide: { authClient },
	}
})
