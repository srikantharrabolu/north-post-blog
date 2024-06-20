import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import router from './router';
import './index.css';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);

app.mount('#app');
