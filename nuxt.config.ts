import 'dotenv/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxt/icon'],
	appConfig: {
		betterAuth: {
			baseUrl: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
		},
	},
	app: {
		head: {
			title: 'MiniWaffle',
			link: [{ rel: 'icon', href: '/waffle.png' }],
		},
	},
	routeRules: {
		'/api/**': {
			/**
			 * This enables CORS for all `/api/*` routes.
			 * Customize the `Access-Control-Allow-Origin` for production mode.
			 */
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			},
		},
	},
})
