<script setup>
import { useHead } from '@unhead/vue';
import Footer from "./components/Footer.vue";
useHead({
      title: 'North Post Global',
    })
</script>

<template>
  <header class="bg-gray-800 py-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-white text-2xl font-bold">North Post</h1>

      <nav class="space-x-4">
        <router-link to="/"
                     class="text-white hover:text-gray-300"
                     active-class="font-bold"
        >News</router-link>
        <router-link to="/health"
                     class="text-white hover:text-gray-300"
                     active-class="font-bold"
        >Health</router-link>
      </nav>
    </div>
  </header>
  <router-view></router-view>
  <Footer></Footer>
</template>


