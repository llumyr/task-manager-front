import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Routes from '@/router/Routes'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: Routes.home,
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { disabledToAuth: true }
  },
  {
    path: Routes.regAuth,
    name: 'regAuth',
    component: () => import('@/pages/RegAuthPage.vue'),
    meta: { disabledToAuth: true }
  },
  {
    path: Routes.tasks,
    name: 'tasks',
    component: () => import('@/pages/TasksPage.vue'),
    meta: { requiredAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta?.requiredAuth && !store.getters.isAuth) {
    next({ path: Routes.home })
  } else if (to.meta?.disabledToAuth && store.getters.isAuth) {
    next({ path: Routes.tasks })
  } else next()
})

export default router
