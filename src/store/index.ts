import { createStore } from 'vuex'
import { tokenRefresh } from '@/services/auth.service'
import router from '@/router'
import Routes from '@/router/Routes'

export default createStore({
  state: {
    isAuth: false
  },
  getters: {
    isAuth: state => state.isAuth
  },
  mutations: {
    setIsAuth (state, payload: boolean) {
      state.isAuth = payload
    }
  },
  actions: {
    async initAuth (context) {
      if (localStorage.token) {
        try {
          const res = await tokenRefresh()
          console.log(res)
          context.commit('setIsAuth', true)
        } catch (e) {
          await router.push(Routes.home)
        }
      }
    }
  },
  modules: {
  }
})
