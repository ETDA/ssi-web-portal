import {object} from '~/lib/state/object'
import {IStateContext} from '~/lib/state/types'
import {Core} from '~/core/Core'

const prefix = 'user/login'

export interface IMeWithTokenItem {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: string;
  date_joined: string;
  updated_at: string;
  is_active: boolean
  token: string;
}

export const state = () => object.state()
export const mutations = object.mutations()
export const actions = {
  post: object.actions((ctx: IStateContext) => ({ baseURL: Core.DefaultAPI('web/login') })).post,
  clear: object.actions({}).clear,
  hookSuccess: (ctx: any, data: any) => {
    ctx.commit('user/me/replace', data, { root: true })
  }
}

export const getters = object.getters()

export const loginStateMeta = object.getStateMeta(prefix)

