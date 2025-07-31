<template>
  <div class="min-h-screen p-8 bg-gray-900 text-white flex gap-6">
    <!-- Left: Manga Info -->
    <div class="w-2/3">
      <img :src="manga.coverImage" alt="cover" class="w-full h-auto rounded" />
    <div class="mt-4">
    <h1 class="text-3xl font-bold mb-2">{{ manga.title }}</h1>
    <p class="text-lg text-gray-400 mb-1">Author: {{ manga.author }}</p>
    <p class="text-lg text-gray-400 mb-1">Genre: {{ manga.genre }}</p>
    <p class="text-lg text-gray-400 mb-1">Price: ${{ manga.price }}</p>
    <p class="mt-4">{{ manga.description }}</p>
  </div>
  </div> 

    <!-- Right: Purchase Options -->
    <div class="w-1/3 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Buy Now</h2>
      <button @click="buyNow" class="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded mb-3">
        Buy Now
      </button>
      <button class="w-full bg-green-600 hover:bg-green-700 py-2 rounded">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const manga = ref({})

onMounted(async () => {
  const res = await axios.get(`http://localhost:5000/api/mangas/${route.params.id}`)
  manga.value = res.data
})

const buyNow = () => {
  router.push({ name: 'Checkout', query: { id: route.params.id } })
}
</script>
