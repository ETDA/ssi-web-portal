import {object} from '~/lib/state/object'
import {IStateContext} from '~/lib/state/types'
import {Core} from '~/core/Core'

const prefix = 'user/changePassword'

export const state = () => object.state()
export const mutations = object.mutations()
export const actions = {
  post: object.actions((ctx: IStateContext) => ({baseURL: Core.DefaultAPI('/web/me/change-password')})).post,
  clear: object.actions({}).clear,
}

export const getters = object.getters()

export const changePasswordStateMeta = object.getStateMeta(prefix)

