<template>
<div class="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <form
    @submit.prevent="handleLogin"
    class="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm"
    >
    <h2 class="text-2xl font-bold mb-6 text-center">Login to Manga Store</h2>

    <div class="mb-4">
        <label class="block text-sm mb-1" for="email">Email</label>
        <input
        v-model="email"
        type="email"
        id="email"
        required
        class="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
    </div>

    <div class="mb-6">
        <label class="block text-sm mb-1" for="password">Password</label>
        <input
        v-model="password"
        type="password"
        id="password"
        required
        class="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
        />
    </div>

    <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
    >
        Login
    </button>

    <p class="text-sm text-center mt-4 text-red-400" v-if="error">{{ error }}</p>
    </form>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
    email: email.value,
    password: password.value
    })

    localStorage.setItem('token', res.data.token)
    router.push('/')
    localStorage.setItem('username', res.data.user.username)

} catch (err) {
    error.value = err.response?.data?.msg || 'Login failed.'
}
}
</script>
