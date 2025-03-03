import 'dotenv/config'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, jwt, openAPI } from 'better-auth/plugins'

// NOTE: absolute import path is necessary here
// since this is also used in sdk package generation
// IMPORTANT: do not change this to relative import path
import { db } from '../../db/client'
import * as schema from '../../db/schema'
import { redis } from './redisClient'

redis.connect()

export const auth = betterAuth({
	trustedOrigins: (process.env.TRUSTED_ORIGINS ?? '').split(','),
	database: drizzleAdapter(db, {
		schema,
		provider: 'pg',
	}),
	secondaryStorage: {
		get: async (key) => {
			const value = await redis.get(key)
			return value ? JSON.stringify(value) : null
		},
		set: async (key, value, ttl) => {
			if (ttl) await redis.set(key, value, { EX: ttl })
			else await redis.set(key, value)
		},
		delete: async (key) => {
			await redis.del(key)
		},
	},
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
