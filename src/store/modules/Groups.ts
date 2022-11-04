import { getGroups } from '@/services/user.service'
import router from '@/router'
import Routes from '@/router/Routes'
import { createGroup } from '@/services/group.service'

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
    },
    async createGroup (context: any, title: string) {
      try {
        const res = await createGroup(title)
        if (res.status === 201) await context.dispatch('getGroups')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
