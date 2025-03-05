import bcrypt from 'bcryptjs'

export const passwordConfig = {
	async hash(password: string) {
		try{
			const saltRounds = 10
			return await bcrypt.hash(password, saltRounds)
		} catch(err) {
			throw new Error(err as never)
		}
	},
	async verify(data: { password: string; hash: string }) {
		try {
			const { password, hash } = data
			return await bcrypt.compare(password, hash)
		} catch(err) {
			throw new Error(err as never)
		}
	},
}
