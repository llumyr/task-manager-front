import { createStore } from 'vuex'
import AuthModule, { AuthState } from '@/store/modules/Auth'
import GroupsModule, { GroupsState } from '@/store/modules/Groups'

export interface State {
  Auth: AuthState,
  Groups: GroupsState
}

export default createStore<State>({
  modules: {
    auth: AuthModule,
    groups: GroupsModule
  }
})
