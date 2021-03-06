import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import '@/styles/main.css'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        offset: { x: 0, y: 10 },
      }
    }
    else {
      return { el: 'body' }
    }
  },
})

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
// app.use(VueApexCharts);
app.mount('#app')
