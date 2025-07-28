<template>
<div class="flex items-center justify-center min-h-screen bg-gray-900 text-white">
    <form @submit.prevent="handleRegister" class="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
    <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>

    <div class="mb-4">
        <label class="block text-sm mb-1">Username</label>
        <input v-model="username" required class="w-full p-2 rounded bg-gray-700" />
    </div>

    <div class="mb-4">
        <label class="block text-sm mb-1">Email</label>
        <input type="email" v-model="email" required class="w-full p-2 rounded bg-gray-700" />
    </div>

    <div class="mb-6">
        <label class="block text-sm mb-1">Password</label>
        <input type="password" v-model="password" required class="w-full p-2 rounded bg-gray-700" />
    </div>

    <button type="submit" class="w-full bg-green-600 hover:bg-green-700 py-2 rounded">Register</button>
    <p class="text-sm mt-4 text-red-400" v-if="error">{{ error }}</p>
    </form>
</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
    username: username.value,
    email: email.value,
    password: password.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/')
    localStorage.setItem('username', res.data.user.username)

} catch (err) {
    error.value = err.response?.data?.msg || 'Registration failed.'
}
}
</script>
