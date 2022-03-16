import {object} from '~/lib/state/object'
import {IObjectState} from '~/lib/state/types'
import {IState} from '~/store/types'
import {commitWithPrefixError, commitWithPrefixLoading} from '~/lib/state/util'
import {NewRequester} from '~/lib/Requester'
import {ActionContext} from 'vuex'
import {Core} from '~/core/Core'
import {IMeState} from '~/models/meModel'

export const prefix = 'user/me'



export const state = () => object.state()

export const mutations = {
  ...object.mutations(),
  replace: (state: IObjectState<IMeState>, data: any) => {
    state.data = data
  },
  update: (state: IObjectState<IMeState>, data: any) => {
    state.isLoading = false
    state.isSuccess = true
    state.isError = false
    state.data = {
      ...state.data,
      ...data
    }
  },
  updateRoles: (state: IObjectState<IMeState>, data: any) => {
    state.options.roles = data
  }
}

export const actions = {
  get: async (ctx: ActionContext<IObjectState<any>, IState>) => {
    commitWithPrefixLoading(ctx.commit)
    try {
      const me = await NewRequester.get<any>('web/me', Core.DefaultAPIOptions(ctx))
      ctx.commit('update', me.data)
    } catch (e) {
      if (e.response && e.response.status === 401) {
        ctx.commit('update', {
          token: null
        })
      }
      commitWithPrefixError(ctx.commit, e)
    }
  }
}

export const meStateMeta = object.getStateMeta(prefix)

export const getters = {
  getUserType: (state) => state?.data?.type
}
