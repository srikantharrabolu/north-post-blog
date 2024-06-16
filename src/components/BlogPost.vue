<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <img :src="'/images/' + post.mainImage" :alt="post.mainAlt" class="w-full h-48 object-cover">
    
    <article class="flex flex-col items-start justify-between p-6">
      <div class="flex items-center gap-x-4 text-xs">
        <time :datetime="post.date" class="text-gray-500">{{ post.date }}</time>
        <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.type }}</a>
      </div>
      <div class="group relative mt-4">
        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="#">
            <span class="absolute inset-0"></span>
            {{ post.title }}
          </a>
        </h3>
        <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.content }}</p>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
}
</script>

