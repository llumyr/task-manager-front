import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Routes from '@/router/Routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: Routes.home,
    name: 'home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: Routes.regAuth,
    name: 'regAuth',
    component: () => import('@/pages/RegAuthPage.vue')
  },
  {
    path: Routes.tasks,
    name: 'tasks',
    component: () => import('@/pages/TasksPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
