import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BlogPostDetails from '../components/BlogPostDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:slug',
    name: 'BlogPostDetails',
    component: BlogPostDetails,
    // meta: {
    //   title: 'Default Title',
    //   description: 'Default Content',
    //   // image: 'Default Image URL'
    // },
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach(async (to, from, next) => {
//   if (to.name === 'BlogPostDetails' && to.params.slug) {
//     const dynamicMeta = await fetchDataBasedOnSlug(to.params.slug);
//     if (dynamicMeta) {
//       to.meta.title = dynamicMeta.title;
//       to.meta.description = dynamicMeta.description;
//       // to.meta.image = dynamicMeta.image;
//     }
//   }
//   next();
// });

async function fetchDataBasedOnSlug(slug) {
  try {
    const response = await fetch('/data/blogs.json');
    const data = await response.json();
    const post = data.find(post => post.slug === slug);
    if (post) {
      return {
        title: post.title,
        description: post.content,
        // image: `https://northpostglobal.com/images/${post.mainImage}`
      };
    } else {
      return {
        title: 'Default Title',
        description: 'Default content',
        // image: 'Default Image URL'
      };
    }
  } catch (error) {
    console.error('Failed to fetch or process data:', error);
    return {
      title: 'Default Title',
      description: 'Default content',
      // image: 'Default Image URL'
    };
  }
}

export default router;
