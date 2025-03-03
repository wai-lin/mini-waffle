import bcrypt from 'bcrypt'

export const passwordUtils = {
	async hash(password: string): Promise<string> {
		const saltRounds = 10
		return bcrypt.hash(password, saltRounds)
	},
	async verify(data: { password: string; hash: string }): Promise<boolean> {
		return bcrypt.compare(data.password, data.hash)
	},
}
