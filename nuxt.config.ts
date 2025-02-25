// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@nuxt/icon'],
	app: {
		head: {
			title: 'MiniWaffle',
			link: [{ rel: 'icon', href: 'waffle.png' }],
		},
	},
})
