import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'

// Style
import 'bootstrap/scss/bootstrap.scss'
import './styles/main.scss'

// Routing
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
    { path: '/ct', component: () => import('@/pages/CanvasTest.vue') },
    { path: '/mike', component: () => import('@/pages/miketest.vue')},
    { path: '/alex', component: () => import('@/pages/alex.vue')},
    { path: '/about', component: () => import('@/pages/About.vue') },
  ]
})

// App
const app = createApp(App)
app.use(router)
app.mount('#app')
