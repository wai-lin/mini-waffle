import type { ClientOptions } from 'better-auth'
import {
	customSessionClient,
	inferAdditionalFields,
} from 'better-auth/client/plugins'
import { auth } from '../server/utils/auth'

export type Auth = typeof auth

export const options = {
	plugins: [inferAdditionalFields<Auth>(), customSessionClient<Auth>()],
} satisfies ClientOptions
