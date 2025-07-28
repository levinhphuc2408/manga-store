<template>
  <nav class="bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow">
    <div class="text-xl font-bold">MangaStore</div>

    <ul class="flex space-x-4 items-center">
      <li><router-link to="/" class="hover:text-yellow-400">Home</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/login" class="hover:text-yellow-400">Login</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/register" class="hover:text-yellow-400">Register</router-link></li>
      <li v-if="isLoggedIn" class="text-sm">Welcome, {{ username }}!</li>
      <li v-if="isLoggedIn">
        <button @click="logout" class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const isLoggedIn = ref(false)

onMounted(() => {
  const storedUser = localStorage.getItem('username')
  if (storedUser) {
    username.value = storedUser
    isLoggedIn.value = true
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  isLoggedIn.value = false
  username.value = ''
  router.push('/login')
}
</script>
