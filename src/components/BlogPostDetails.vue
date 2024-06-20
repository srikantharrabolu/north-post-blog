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
          <!-- <template v-else-if="mediaItem.type === 'video'">
            <YouTube 
              :src="mediaItem.url" 
              @ready="onReady"
              ref="youtube" />
          </template> -->
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
  
  <script>
  import { useHead } from '@vueuse/head';
  
  export default {
    name: 'BlogPostDetails',
    data() {
      return {
        post: null,
      };
    },
    created() {
      this.fetchPost();
    },
    methods: {
    async fetchPost() {
      try {
        const response = await fetch('/data/blogs.json');
        const data = await response.json();
        this.post = data.find(post => post.slug === this.$route.params.slug);

        if (this.post) {
          useHead({
            title: this.post.title,
            meta: [
            { name: 'content', content: this.post.content },
              { property: 'og:title', content: this.post.title },
              { property: 'og:content', content: this.post.content },
              { property: 'og:image', content: `https://www.northpostglobal.com/images/${post.mainImage}` },
              
            ]
          });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
      onReady() {
        this.$refs.youtube.playVideo();
      },
      navigateToHome() {
        this.$router.push({ path: '/' });
      },
    },
  };
  </script>
  
  <style scoped>
  .blog-post {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px 0;
  }
  </style>
  