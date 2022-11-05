import { ActionContext } from 'vuex'
import { State } from '@/store'
import { getGroups } from '@/services/user.service'
import router from '@/router'
import Routes from '@/router/Routes'
import { createGroup, deleteGroup, getGroup } from '@/services/group.service'

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
    removeGroup: (state: GroupsState, _id: string) => {
      for (let i = 0; i < state.groups.length; i++) {
        if (state.groups[i]._id === _id) {
          state.groups.splice(i, 1)
          break
        }
      }
    },
    setActiveGroup: (state: GroupsState, payload: IGroup) => (state.activeGroup = payload)
  },
  actions: {
    async getGroup ({ getters, commit }: GroupsContext): Promise<void> {
      try {
        const res = await getGroup(getters.activeGroup._id)
        console.log(res)
        if (res.status === 200) commit('setActiveGroup', res.data)
      } catch (e) {
        console.log(e)
      }
    },
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
        if (res.status === 201) commit('addGroup', res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async deleteGroup ({ commit }: GroupsContext, _id: string): Promise<void> {
      try {
        const res = await deleteGroup(_id)
        if (res.status === 204) commit('removeGroup', _id)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
