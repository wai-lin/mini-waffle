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

const formErrMsg = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
	const result = await authClient.signIn.email(event.data)
	if (result.error) formErrMsg.value = result.error.message ?? ''
}
</script>

<template>
	<UForm
		:schema="schema"
		:state="formState"
		@submit="onSubmit"
		class="space-y-4"
	>
		<UAlert
			v-if="formErrMsg.length > 0"
			color="red"
			variant="subtle"
			title="Error!"
			:description="formErrMsg"
		/>

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
