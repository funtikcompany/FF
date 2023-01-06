import { createRouter, createWebHistory } from 'vue-router'
import Postpage from '../views/Posts.vue'
import Map from '../views/Map.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Postpage
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
