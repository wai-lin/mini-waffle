<script setup lang="ts">
import { authClient } from "~/shared/utils/auth-client"

const session = useSession()

const signUpForm = reactive({
    name: "",
    email: "",
    password: "",
})
async function onSignUp() {
    const signUp = await authClient.signUp.email({ ...signUpForm })
    if (signUp?.error) {
        alert(
            `Failed to SignUp.\n${signUp.error.status}: ${signUp.error?.message}`
        )
    }
    if (signUp?.data) {
        alert("SignUp Success!")
    }
}

const signInForm = reactive({
    email: "",
    password: "",
})
async function onSignIn() {
    const signIn = await authClient.signIn.email({ ...signInForm })
    if (signIn?.error) {
        alert(
            `Failed to SignIn.\n${signIn.error.status}: ${signIn.error?.message}`
        )
    }
    if (signIn?.data) {
        alert("SignIn Success!")
    }
}
</script>

<template>
    <h1>Hello World!</h1>

    <form @submit.prevent="onSignUp">
        <h4>Sign Up</h4>
        <input type="text" placeholder="Username" v-model="signUpForm.name" />
        <input type="email" placeholder="Email" v-model="signUpForm.email" />
        <input type="password" placeholder="Password" v-model="signUpForm.password" />
        <button type="submit">Sign Up</button>
    </form>

    <form @submit.prevent="onSignIn">
        <h4>Sign In</h4>
        <input type="email" placeholder="Email" v-model="signInForm.email" />
        <input type="password" placeholder="Password" v-model="signInForm.password" />
        <button type="submit">Sign In</button>
    </form>

    <article>
        <button @click="authClient.signOut">Sign Out</button>
        <pre v-if="session.isPending">Session is pending...</pre>
        <pre v-if="session.data">{{ session.data.session.expiresAt }}</pre>
        <pre v-if="session.error">{{ session.error?.message }}</pre>
    </article>
</template>

<style>
form {
    max-width: 40%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
}
</style>