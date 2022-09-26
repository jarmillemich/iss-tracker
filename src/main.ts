import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Style
import 'bootstrap/scss/bootstrap.scss'

// Routing
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') }
  ]
})

// App
const app = createApp(App)
app.use(router)
app.mount('#app')
