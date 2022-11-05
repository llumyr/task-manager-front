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
    setGroups: (state: GroupsState, payload: IGroup[]) => (state.groups = payload),
    addGroup: (state: GroupsState, payload: IGroup) => state.groups.push(payload),
    setActiveGroup: (state: GroupsState, payload: IGroup) => (state.activeGroup = payload)
  },
  actions: {
    async getGroups ({ commit }: GroupsContext): Promise<void> {
      try {
        const res = await getGroups()
        commit('setGroups', res.data)
        if (res.data.length !== 0) commit('setActiveGroup', res.data[0])
      } catch (e) {
        await router.push(Routes.home)
      }
    },
    async createGroup ({ commit }: GroupsContext, title: string): Promise<void> {
      try {
        const res = await createGroup(title)
        if (res.status === 201) await commit('addGroup', res.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
