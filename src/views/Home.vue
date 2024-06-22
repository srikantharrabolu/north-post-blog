<template>
    <div>
      <div class="bg-white sm:py-12">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="flex justify-between items-center mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blogs</h2>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search posts by title"
              class="ml-auto p-2 border border-gray-300 rounded-md w-64"
            />
          </div>
          <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <BlogPost
              v-for="post in filteredPosts"
              :key="post.id"
              :post="post"
              @get-blog-page="getBlog(post)"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import BlogPost from '../components/BlogPost.vue';
  
  export default {
    components: {
      BlogPost
    },
    data() {
      return {
        posts: [],
        searchQuery: ''
      };
    },
    computed: {
    filteredPosts() {
      return this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
    created() {
      fetch('/data/blogs.json')
        .then(response => response.json())
        .then(data => {
          this.posts = data;
        });
    },
    methods: {
     getBlog(post) {
      this.$router.push({
        name: 'BlogPostDetails',
        params: {
          slug: post.slug
        },
        props: {
          post
        }
      })
    }
    }
  };
  </script>
  