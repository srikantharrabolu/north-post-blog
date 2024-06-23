<script setup>
import { useHead } from '@unhead/vue';
import Footer from "./components/Footer.vue";
useHead({
      title: 'North Post Global',
      meta: [
      { property: 'og:image', content: `https://northpostglobal.com/images/adobe.png` },
    ]
    })
</script>

<template>
  <header class="bg-gray-800 py-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-white text-2xl font-bold">North Post</h1>
    </div>
  </header>
  <router-view></router-view>
  <Footer></Footer>
</template>


