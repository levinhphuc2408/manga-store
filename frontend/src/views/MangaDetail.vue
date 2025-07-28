<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div v-if="manga" class="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
      <img :src="manga.coverImage" alt="Cover" class="w-full h-96 object-cover mb-6 rounded" />
      <h2 class="text-3xl font-bold mb-2">{{ manga.title }}</h2>
      <p class="text-sm text-gray-400 mb-2">By {{ manga.author }}</p>
      <p class="mb-4">{{ manga.description }}</p>
      <div class="text-sm">
        <p><strong>Genre:</strong> {{ manga.genre }}</p>
        <p><strong>Price:</strong> ${{ manga.price }}</p>
        <p><strong>Stock:</strong> {{ manga.stock }}</p>
      </div>
    </div>
    <div v-else class="text-center text-red-400">Loading manga details...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const manga = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/manga/${route.params.id}`)
    manga.value = res.data
  } catch (err) {
    console.error('Failed to fetch manga:', err)
  }
})
</script>
