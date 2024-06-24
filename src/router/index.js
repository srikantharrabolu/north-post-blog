import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Health from '../views/Health.vue';
import BlogPostDetails from '../components/BlogPostDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'North Post Global',
      metaTags: [
        {
          name: 'description',
          content: 'Welcome to North Post Global - Your trusted source for global news.',
        },
        {
          property: 'og:title',
          content: 'North Post Global',
        },
        {
          property: 'og:description',
          content: 'Welcome to North Post Global - Your trusted source for global news.',
        },
        {
          property: 'og:image',
          content: 'https://northpostglobal.com/images/1.png',
        },
      ],
    },
  },
  {
    path: '/health',
    name: 'Health',
    component: Health,
  },
  {
    path: '/post/:slug',
    name: 'BlogPostDetails',
    component: BlogPostDetails,
    props: true
  },
  {
    path: '/post/:slug',
    name: 'BlogHealthPostDetails',
    component: BlogPostDetails,
    props: true
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
