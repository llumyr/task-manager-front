import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Routes from '@/router/Routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: Routes.home,
    name: 'home',
    component: () => import('@/pages/HomePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
