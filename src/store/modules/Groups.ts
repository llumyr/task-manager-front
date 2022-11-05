import { ActionContext } from 'vuex'
import { State } from '@/store'
import { getGroups } from '@/services/user.service'
import router from '@/router'
import Routes from '@/router/Routes'
import { createGroup } from '@/services/group.service'

export interface IGroup {
  _id: string
  title: string
  tasks?: any[]
}

export interface GroupsState {
  groups: IGroup[]
  activeGroup: IGroup
}

type GroupsContext = ActionContext<GroupsState, State>

export default {
  namespaced: true,
  state: {
    groups: [],
    activeGroup: {}
  },
  getters: {
    groups: (state: GroupsState) => state.groups,
    activeGroup: (state: GroupsState) => state.activeGroup
  },
  mutations: {
    setGroups (state: GroupsState, payload: any) {
      state.groups = payload
    },
    setActiveGroup (state: GroupsState, payload: any) {
      state.activeGroup = payload
    }
  },
  actions: {
    async getGroups (context: GroupsContext) {
      try {
        const res = await getGroups()
        context.commit('setGroups', res.data)
      } catch (e) {
        await router.push(Routes.home)
      }
    },
    async createGroup (context: GroupsContext, title: string) {
      try {
        const res = await createGroup(title)
        if (res.status === 201) await context.dispatch('getGroups')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
