<template>
	<section class="grid h-screen w-screen place-items-center">
		<UCard class="w-4/5 md:w-1/2 lg:w-1/4">
			<template #header>
				<h3 class="text-xl font-bold">Sign Up</h3>
			</template>

			<AuthSignUp />

			<template #footer>
				<p class="text-sm text-gray-500">
					Already have an account?
					<ULink
						to="/auth/sign-in"
						class="text-blue-500 hover:text-blue-700 hover:underline"
					>
						Sign In
					</ULink>
				</p>
			</template>
		</UCard>
	</section>
</template>
