import { createClient } from 'redis'

let redis: ReturnType<typeof createClient> | null = null

export async function getRedisClient() {
	if (!redis) {
		redis = createClient()
		await redis.connect()
	}
	return redis
}
