import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'
import { options } from '~/lib'

const plugins = options.plugins ?? []

export const authClient = createAuthClient({
	baseURL: 'http://localhost:3000/',
	...options,
	plugins: [...plugins, adminClient()],
})
