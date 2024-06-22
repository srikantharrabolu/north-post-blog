<script setup>
import { useMeta } from "vue-meta";
import Footer from "./components/Footer.vue";
useMeta({
      title: 'North Post Global',
      htmlAttrs: {
        lang: 'en',
        amp: true
      }
    })
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
  <header class="bg-gray-800 py-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-white text-2xl font-bold">North Post</h1>
    </div>
  </header>
  <router-view></router-view>
  <Footer></Footer>
</template>


