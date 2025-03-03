<script setup lang="ts">
const pubPkgJson = `// pub.package.json
// replace name with your desired package name if you want to publish to npm
// update version as you needed
{
	"$schema": "https://json.schemastore.org/package",
	"name": "@mini-waffle/sdk-config",
	"version": "0.0.0",
	"description": "BetterAuth SDK configuration",
	"main": "index.esm.js",
	"types": "index.d.ts"
}`
</script>
<template>
	<UContainer class="space-y-8">
		<h1 class="text-3xl font-bold">Client SDK Usage</h1>

		<article class="space-y-4">
			<h3 class="text-xl font-bold">Step 1</h3>
			<p class="text-lg text-gray-600">
				<code>mini-waffle</code> provide <code>better-auth</code> client sdk
				configuration as deployable library. You just need to change the
				<code>pub.package.json</code> file to your need. Bellow is the default
				<code>pub.package.json</code> file.
			</p>

			<pre>{{ pubPkgJson }}</pre>

			<hr />
		</article>

		<article class="space-y-4">
			<h3 class="text-xl font-bold">Step 2</h3>
			<ul class="list-disc space-y-2 pl-4 text-lg text-gray-600">
				<li>
					Run <code>pnpm install</code> if you haven't yet and then run
					<code>pnpm bundle:sdk</code>. It will output a
					<code>dist</code> folder inside <code>lib</code> folder.
				</li>

				<li>
					<code>cd lib/dist</code> directory and run <code>pnpm publish</code>
				</li>
			</ul>
		</article>
	</UContainer>
</template>

<style scoped>
code {
	@apply rounded-md bg-green-200 p-1 text-base text-gray-600;
}

pre {
	@apply max-h-80 max-w-full overflow-auto rounded-lg bg-gray-100 p-4;
}
</style>
