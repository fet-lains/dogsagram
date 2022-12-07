import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import vueClickOutsideElement from 'vue-click-outside-element';
import '@/assets/css/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vueClickOutsideElement, 'click-outside');

app.mount('#app');
