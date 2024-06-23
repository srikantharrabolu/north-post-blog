import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@unhead/vue';
import { useHead } from '@unhead/vue';
import router from './router';
import './index.css';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
router.beforeEach((to, from, next) => {
    const defaultTitle = 'North Post Global';
    const defaultMeta = [
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
    ];
  
    const metaTags = to.meta.metaTags || [];
    const mergedMetaTags = [...defaultMeta, ...metaTags];
  

    useHead({
      title: to.meta.title || defaultTitle,
      meta: mergedMetaTags,
    });
  
    next();
  });
app.mount('#app');
