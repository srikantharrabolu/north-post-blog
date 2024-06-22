<template>
    <div class="container mx-auto py-8">
      <button @click="navigateToHome" class="bg-gray-800 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
        Back to Home
      </button>
      <div v-if="post" class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 class="text-3xl font-bold mb-4">{{ post.title }}</h2>
        <div class="mb-6" v-for="mediaItem in post.media" :key="mediaItem.url">
          <template v-if="mediaItem.type === 'image'">
            <img :src="'/images/' + mediaItem.url" alt="Post image" class="w-full h-auto mb-4 rounded-md shadow-sm">
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';

const route = useRoute();
const router = useRouter();
const post = ref(null);

console.log(route, router)

useMeta(() => ({
  title: route.meta.title,
  meta: [
    { name: 'description', content: route.meta.description },
    { property: 'og:image', content: route.meta.image },
  ],
}));

onMounted(async () => {
  await fetchPost();
});

const fetchPost = async () => {
  try {
    const response = await fetch('/data/blogs.json');
    const data = await response.json();
    post.value = data.find(p => p.slug === route.params.slug);
    if (post.value) {
      updateMeta(post.value);
    } else {
      console.error("Post not found for slug:", route.params.slug);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

const updateMeta = (post) => {
  useMeta({
    title: post.title,
    htmlAttrs: {
      lang: 'en',
      amp: true
    },
    meta: [
      { name: 'description', content: post.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `https://northpostglobal.com/post/${post.slug}` },
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.description },
      { property: 'og:image', content: `https://northpostglobal.com/images/${post.mainImage}` },
      { property: 'og:image:secure_url', content: `https://northpostglobal.com/images/${post.mainImage}` }
      // Add other meta tags as needed
    ]
  });
};

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
  