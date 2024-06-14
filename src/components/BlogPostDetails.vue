<template>
    <div class="container mx-auto py-8">
      <div v-if="post" class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 class="text-3xl font-bold mb-4">{{ post.title }}</h2>
        <div class="mb-6" v-for="mediaItem in post.media" :key="mediaItem.url">
          <template v-if="mediaItem.type === 'image'">
            <img :src="mediaItem.url" alt="Post image" class="w-full h-auto mb-4 rounded-md shadow-sm">
          </template>
          <template v-else-if="mediaItem.type === 'video'">
            <video controls class="w-full h-auto mb-4 rounded-md shadow-sm">
              <source :src="mediaItem.url" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </template>
        </div>
        <p class="text-gray-700 mb-6">{{ post.content }}</p>
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
    fetchPost() {
      fetch(`/data/blogs.json`)
        .then(response => response.json())
        .then(data => {
            console.log("test", this.$route.params, this.$props);
          this.post = data.find(post => post.slug === this.$route?.params?.slug);
        });
    }
  }
  };
  </script>
  
  <style scoped>
  .blog-post {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 20px 0;
  }
  </style>
  