<template>
  <div class="p-6 text-white">
    <h1 class="text-3xl font-bold mb-6 text-center">Browse Manga</h1>

    <div v-if="loading" class="text-center">Loading mangas...</div>
    <div v-else-if="error" class="text-red-400 text-center">{{ error }}</div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <router-link
        v-for="manga in mangas"
        :key="manga._id"
        :to="`/manga/${manga._id}`"
        class="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
      >
        <img
          :src="manga.coverImage"
          alt="cover"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold">{{ manga.title }}</h2>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const mangas = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:5000/api/manga', {
      headers: { Authorization: `Bearer ${token}` }
    })
    mangas.value = res.data
  } catch (err) {
    error.value = err.response?.data?.msg || 'Failed to load mangas.'
  } finally {
    loading.value = false
  }
})
</script>
