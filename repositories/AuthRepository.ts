import {BaseRepository} from '~/repositories/BaseRepository'
import {IStatus} from '~/lib/state/types'
import {loginStateMeta} from '~/store/user/login'
import {meStateMeta} from '~/store/user/me'
import {logoutStateMeta} from '~/store/user/logout'
import {ParamHelper} from '~/utils/ParamHelper'
import {IMeState} from '~/models/meModel'
import {changePasswordStateMeta} from "~/store/user/changePassword";

export default class AuthRepository extends BaseRepository {
  get loginStatus(): IStatus {
    return this.getters[loginStateMeta.getterTypes.status]
  }

  get logoutStatus(): IStatus {
    return this.getters[logoutStateMeta.getterTypes.status]
  }

  get me(): IMeState {
    return this.state.user.me.data
  }

  get email() {
    return this.state.user.me.data?.email || ''
  }

  get isAuth(): boolean {
    return ParamHelper.getBoolFalse(this.state.user.me.data?.token)
  }

  get isLock(): boolean {
    return ParamHelper.getBoolFalse(this.state.user.me.data?.email) &&
        !ParamHelper.getBoolFalse(this.state.user.me.data?.token)
  }

  login = (email: string, password: string): Promise<any> => {
    return this.dispatch(new loginStateMeta.actionTypes.Post({email, password}))
  }

  resetLogin = (): Promise<any> => {
    return this.dispatch(new loginStateMeta.actionTypes.Clear())
  }

  changePassword = (current_password: string, new_password: string): Promise<any> => {
    return this.dispatch(new changePasswordStateMeta.actionTypes.Post({current_password, new_password}))
  }

  get changePasswordStatus(): IStatus {
    return this.getters[changePasswordStateMeta.getterTypes.status]
  }

  logout = async (): Promise<any> => {
    return this.dispatch(new logoutStateMeta.actionTypes.Post())
  }

  fetchMe = (): Promise<any> => {
    return this.dispatch(new meStateMeta.actionTypes.Get())
  }

  updateMe = (data: any): void => {
    return this.commit('user/me/update', data)
  }

  replaceMe = (data: any): void => {
    return this.commit('user/me/replace', data)
  }
}
