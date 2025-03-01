import { count, eq } from 'drizzle-orm'
import { db } from '~/db/client'
import { user } from '~/db/schema'

export default defineEventHandler(async () => {
	try {
		const result = await db
			.select({ count: count() })
			.from(user)
			.where(eq(user.role, 'admin'))
			.then((res) => res.at(0))

		console.log('Result::', result)

		return (result?.count ?? 0) > 0
	} catch (err) {
		return err as Error
	}
})
