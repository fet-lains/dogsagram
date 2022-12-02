import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import useDoubleTap from '@/composables/useDoubleTap.js';
import '@/style.css';

// Touch events library
// https://www.npmjs.com/package/vue3-touch-events
import Vue3TouchEvents from 'vue3-touch-events';

const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  .use(Vue3TouchEvents)
  .directive('double-tap', {
    beforeMount: (el) => {
      useDoubleTap(el);
    },
  })
  .mount('#app');
