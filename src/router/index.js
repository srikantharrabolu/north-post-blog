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
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
