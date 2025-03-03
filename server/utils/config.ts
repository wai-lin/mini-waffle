export const authConfig = {
	trustedOrigins: (process.env.TRUSTED_ORIGINS ?? '')
		.split(',')
		.filter(Boolean),
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID ?? '',
		clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
	},
	microsoft: {
		clientId: process.env.MICROSOFT_CLIENT_ID ?? '',
		clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? '',
	},
}

Object.entries(authConfig).forEach(([key, value]) => {
	const errorMsg = `Missing or empty config: ${key}`

	if (value === undefined) console.warn(errorMsg)
	else if (Array.isArray(value) && value.length <= 0) console.warn(errorMsg)
	else if (typeof value === 'string' && value === '') console.warn(errorMsg)
})
