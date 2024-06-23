<template>
  <div>
    <div class="bg-white sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex justify-between items-center mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">News Blogs</h2>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search posts by title"
            class="ml-auto p-2 border border-gray-300 rounded-md w-64"
          />
        </div>
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <BlogPost
            v-for="post in paginatedPosts"
            :key="post.id"
            :post="post"
            @get-blog-page="getBlog(post)"
          />
        </div>
        <!-- Pagination -->
        <nav class="flex justify-center mt-10">
          <ul class="flex space-x-2">
            <li>
              <button
                @click.prevent="prevPage"
                :disabled="currentPage === 1"
                :class="{ 'cursor-not-allowed text-gray-400': currentPage === 1 }"
                class="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                :aria-disabled="currentPage === 1"
              >
                Previous
              </button>
            </li>
            <li v-for="page in pagesToShow" :key="page">
              <button
                @click.prevent="goToPage(page)"
                :class="['px-4 py-2 border border-gray-300', currentPage === page ? 'bg-gray-200' : 'bg-white', 'text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md']"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                @click.prevent="nextPage"
                :disabled="currentPage === totalPages"
                :class="{ 'cursor-not-allowed text-gray-400': currentPage === totalPages }"
                class="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                :aria-disabled="currentPage === totalPages"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <!-- End Pagination -->
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
      searchQuery: '',
      currentPage: 1,
      postsPerPage: 6 // Number of posts per page
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.postsPerPage;
      return this.filteredPosts.slice(startIndex, startIndex + this.postsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage);
    },
    pagesToShow() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
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
      });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    }
  }
};
</script>
