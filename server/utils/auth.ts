import 'dotenv/config'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, jwt, openAPI } from 'better-auth/plugins'

// NOTE: absolute import path is necessary here
// since this is also used in sdk package generation
// IMPORTANT: do not change this to relative import path
import { db } from '../../db/client'
import * as schema from '../../db/schema'

export const auth = betterAuth({
	trustedOrigins: (process.env.TRUSTED_ORIGINS ?? '').split(','),
	database: drizzleAdapter(db, {
		schema,
		provider: 'pg',
	}),
	// TODO: setup Redis here. secondaryStorage: {},
	advanced: {
		generateId: false,
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: false,
		// TODO: implement with bcrypt here. password: {
		// 	hash(password) {
		// 	},
		// 	verify(data) {
		// 	},
		// }
	},
	plugins: [
		openAPI(),
		admin(),
		jwt({
			jwks: {
				keyPairConfig: { alg: 'ES512' },
			},
		}),
	],
	onAPIError: {
		onError(err) {
			console.log('BetterAuth Error : ', err)
		},
	},
})
