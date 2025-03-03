import 'dotenv/config'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, jwt, openAPI } from 'better-auth/plugins'
import { createClient } from 'redis'

// NOTE: absolute import path is necessary here
// since this is also used in sdk package generation
// IMPORTANT: do not change this to relative import path
import { db } from '../../db/client'
import * as schema from '../../db/schema'

export async function createBetterAuth() {
	const redis = createClient()
	await redis.connect()

	const auth = betterAuth({
		// TODO: move TrustedOrigins to database configuration
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
		rateLimit: {
			storage: 'secondary-storage',
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
		socialProviders: {
			// TODO: move configurations to databse
			google: {
				clientId: process.env.GOOGLE_CLIENT_ID ?? '',
				clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			},
			microsoft: {
				clientId: process.env.MICROSOFT_CLIENT_ID ?? '',
				clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? '',
			},
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
				// TODO: log error in somewhere persistent
				console.log('BetterAuth Error : ', err)
			},
		},
	})

	return auth
}
