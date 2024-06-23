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
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';

const route = useRoute();
const router = useRouter();
const post = ref(null);

const title = ref('');
const content = ref('');
const image = ref('');

const updateMeta = (post) => {
  title.value = post.title;
  content.value = post.content;
  image.value = `https://northpostglobal.com/images/${post.mainImage}`;

  useHead({
    title: post.title,
    meta: [
      { name: 'description', content: post.content },
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.content },
      { property: 'og:image', content: `https://northpostglobal.com/images/${post.mainImage}` },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:title', content: post.title },
      { name: 'twitter:description', content: post.content },
      { name: 'twitter:image', content: `https://northpostglobal.com/images/${post.mainImage}` },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  });
};

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
