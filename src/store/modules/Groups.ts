import { getGroups } from '@/services/user.service'
import router from '@/router'
import Routes from '@/router/Routes'

export default {
  state: {
    groups: []
  },
  getters: {
    groups: (state: any) => state.groups
  },
  mutations: {
    setGroups (state: any, payload: boolean) {
      state.groups = payload
    }
  },
  actions: {
    async getGroups (context: any) {
      try {
        const res = await getGroups()
        context.commit('setGroups', res.data)
      } catch (e) {
        await router.push(Routes.home)
      }
    }
  },
  modules: {
  }
}
