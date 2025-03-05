import 'dotenv/config'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, jwt, openAPI } from 'better-auth/plugins'

// NOTE: absolute import path is necessary here
// since this is also used in sdk package generation
// IMPORTANT: do not change this to relative import path
import * as schema from '../../db/schema'
import { authConfig } from './config'
import { db } from './db'
import { passwordConfig } from './hashing'
import { getRedisClient } from './redis'

export type Auth = Awaited<ReturnType<typeof createAuthInstance>>
let authInstance: Auth | null = null

export async function createBetterAuth() {
	if (authInstance) {
		return authInstance
	}

	authInstance = await createAuthInstance()
	return authInstance
}

async function createAuthInstance() {
	const redis = await getRedisClient()

	return await betterAuth({
		// TODO: move TrustedOrigins to database configuration
		trustedOrigins: authConfig.trustedOrigins,
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
			password: passwordConfig,
		},
		socialProviders: {
			// TODO: move configurations to databse
			google: authConfig.google,
			microsoft: authConfig.microsoft,
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
}
