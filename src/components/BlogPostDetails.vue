<template>
  <div class="container mx-auto py-8">
    <button @click="navigateToHome" class="bg-gray-800 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
      Back to Home
    </button>
    <div v-if="post" class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 class="text-3xl font-bold mb-4">{{ post.title }}</h2>
      <div class="mb-6" v-for="mediaItem in post.media" :key="mediaItem.url">
        <template v-if="mediaItem.type === 'image'">
          <img :src="'/images/' + mediaItem.url" :alt="post.mainAlt" class="w-full h-auto mb-4 rounded-md shadow-sm">
        </template>
      </div>
      <p class="text-gray-700 mb-6" v-html="post.description"></p>
      <div class="text-gray-600 text-sm">
        <span>By Srikanth</span> | <time :datetime="post.date">{{ post.date }}</time>
      </div>
    </div>
    <div v-else class="text-center text-gray-600">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

const route = useRoute();
const router = useRouter();
const post = ref(null); 

useHead({
  title: ref(''), // Dynamic title to be updated
  meta: [
    {
      name: 'description',
      content: ref(''), // Dynamic description to be updated
    },
    {
      property: 'og:title',
      content: ref(''), // Dynamic Open Graph title to be updated
    },
    {
      property: 'og:description',
      content: ref(''), // Dynamic Open Graph description to be updated
    },
    {
      property: 'og:image',
      content: ref(''), // Dynamic Open Graph image URL to be updated
    },
  ],
});

const fetchPost = async () => {
  try {
    const path = route.name == 'BlogHealthPostDetails' ? '/data/health.json' : '/data/blogs.json'
    const response = await fetch(path);
    const data = await response.json();
    post.value = data.find(p => p.slug === route.params.slug);
    useHead({
      title: post.value.title,
      meta: [
        {
          name: 'description',
          content: post.value.content,
        },
        {
          property: 'og:title',
          content: post.value.title,
        },
        {
          property: 'og:description',
          content: post.value.content,
        },
        {
          property: 'og:image',
          content: post.value.imageURL,
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

onMounted(fetchPost);

watch(() => route.params.slug, fetchPost);

const navigateToHome = () => {
  router.push({ path: '/' });
};
</script>

<style scoped>
.blog-post {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 20px 0;
}
</style>
