import {object} from '~/lib/state/object'
import {IStateContext} from '~/lib/state/types'
import {Core} from '~/core/Core'

const prefix = 'user/logout'

export const state = () => object.state()
export const mutations = object.mutations()
export const actions = {
  post: object.actions(
    (ctx: IStateContext) => ({ ...Core.DefaultAPIOptions(ctx), baseURL: Core.DefaultAPI('web/logout') })).post,
  hookSuccess: (ctx: any) => {
    ctx.commit('user/me/replace', null, { root: true })
  },
  hookError: (ctx: any) => {
    console.log('55Z',)
    ctx.commit('user/me/replace', null, { root: true })
  }
}

export const getters = object.getters()

export const logoutStateMeta = object.getStateMeta(prefix)

