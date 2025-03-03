import type { ClientOptions } from 'better-auth'
import {
	customSessionClient,
	inferAdditionalFields,
} from 'better-auth/client/plugins'
import { type Auth } from '../server/utils/auth'

export const options = {
	plugins: [inferAdditionalFields<Auth>(), customSessionClient<Auth>()],
} satisfies ClientOptions
