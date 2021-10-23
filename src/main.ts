// register vue composition api globally
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'

import App from './App.vue'

// your custom styles here
import './styles/main.css'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        offset: { x: 0, y: 10 },
      };
    } else {
      return { el: 'body' };
    }
  },
});

const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount('#app');
