<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const authClient = useNuxtApp().$authClient

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})
type Schema = typeof schema._output

const formState = reactive<Schema>({
	email: '',
	password: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
	console.log(event.data)
	const result = await authClient.signIn.email(event.data)
	if (result.error)
		result.error.message
}
</script>

<template>
	<UForm
		:schema="schema"
		:state="formState"
		@submit="onSubmit"
		class="space-y-4"
	>
		<UFormGroup label="Email">
			<UInput
				v-model="formState.email"
				type="email"
				placeholder="your-email@gmail.com"
			/>
		</UFormGroup>

		<UFormGroup label="Password">
			<UInput
				v-model="formState.password"
				type="password"
				placeholder="your secure password..."
			/>
		</UFormGroup>

		<UButton type="submit" label="Sign In" block />
	</UForm>
</template>
