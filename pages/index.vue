<script setup lang="ts">
const { data: alreadyHasAdmin } = await useFetch('/api/users/check-admins')
</script>

<template>
	<section class="grid h-screen w-screen place-items-center">
		<UCard class="w-4/5 md:w-1/2 lg:w-1/4">
			<template #header>
				<h3 class="text-xl font-bold">Sign In</h3>
			</template>

			<AuthSignIn />
		</UCard>
	</section>
</template>

<style></style>
