import { ActionContext } from 'vuex'
import { State } from '@/store'
import router from '@/router'
import Routes from '@/router/Routes'
import { signIn, signUp, tokenRefresh } from '@/services/auth.service'

export interface AuthState {
  isAuth: boolean
}

type AuthContext = ActionContext<AuthState, State>

export default {
  namespaced: true,
  state: {
    isAuth: false
  },
  getters: {
    isAuth: (state: AuthState) => state.isAuth
  },
  mutations: {
    setIsAuth (state: AuthState, payload: boolean) {
      state.isAuth = payload
    }
  },
  actions: {
    async initAuth (context: AuthContext) {
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
    async signUp (context: AuthContext, { username, password }: { username: string, password: string }) {
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
    async signIn (context: AuthContext, { username, password }: { username: string, password: string }) {
      try {
        const res = await signIn(username, password)
        if (res.status === 200) {
          localStorage.token = res.data.token
          context.commit('setIsAuth', true)
          await router.push(Routes.tasks)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async logout ({ commit }: AuthContext) {
      commit('setIsAuth', false)
      localStorage.removeItem('token')
      await router.push(Routes.home)
    }
  }
}
