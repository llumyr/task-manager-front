import { createStore } from 'vuex'
import { signIn, signUp, tokenRefresh } from '@/services/auth.service'
import router from '@/router'
import Routes from '@/router/Routes'
import Groups from '@/store/modules/Groups'

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
          if (res.status === 200) {
            localStorage.token = res.data.token
            context.commit('setIsAuth', true)
            await router.push(Routes.tasks)
          }
        } catch (e) {
          console.log(e)
          await router.push(Routes.home)
        }
      }
    },
    async signUp (context, { username, password }: { username: string, password: string }) {
      try {
        const res = await signUp(username, password)
        if (res.status === 201) {
          localStorage.token = res.data.token
          await router.push(Routes.tasks)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async signIn (context, { username, password }: { username: string, password: string }) {
      try {
        const res = await signIn(username, password)
        if (res.status === 200) {
          localStorage.token = res.data.token
          await router.push(Routes.tasks)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
    Groups
  }
})
