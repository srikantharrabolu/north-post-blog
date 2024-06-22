import { createApp } from 'vue';
import App from './App.vue';
import {createMetaManager} from 'vue-meta'
import router from './router';
import './index.css';

const app = createApp(App);
const meta = createMetaManager(false, {
    meta: { tag: 'meta', nameless: true },
    })

app.use(router);
app.use(meta);

app.mount('#app');
