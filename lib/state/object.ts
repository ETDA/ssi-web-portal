import {
  addPrefix,
  commitWithPrefixError,
  commitWithPrefixLoading,
  commitWithPrefixSuccess,
  commonObjectState,
  getRequestObjectOption,
  mutationErrorStatus,
  mutationLoadingStatus,
  mutationResetStatus,
  mutationSuccessStatus
} from '~/lib/state/util'
import {NewRequester} from '~/lib/Requester'
import {ActionContext, GetterTree, Mutation, MutationTree} from 'vuex'
import {
  clear,
  Del,
  del,
  get,
  IActionOptions,
  IObjectState,
  IObjectStateMeta,
  IStateContext,
  IStatus,
  Post,
  post,
  put
} from '~/lib/state/types'
import {IState} from '~/store/types'
import {_get} from '~/utils/lodash'

export const defaultObjectState = () => ({
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoaded: false,
  errorData: null,
  options: {},
  data: null,
  put: commonObjectState(),
  post: commonObjectState()
})

const getterTypes = (prefix: string) => ({
  status: `${prefix}/status`,
  putStatus: `${prefix}/putStatus`,
  postStatus: `${prefix}/postStatus`
})

const getters = (): GetterTree<IObjectState<any>, IState> => ({
  status (state): IStatus {
    return {
      isError: state.isError,
      isSuccess: state.isSuccess,
      isLoaded: state.isLoaded,
      isLoading: state.isLoading,
      errorData: state.errorData
    }
  },
  putStatus (state): IStatus {
    return {
      isError: state.put.isError,
      isSuccess: state.put.isSuccess,
      isLoaded: state.put.isLoaded,
      isLoading: state.put.isLoading,
      errorData: state.put.errorData
    }
  },
  postStatus (state): IStatus {
    return {
      isError: state.post.isError,
      isSuccess: state.post.isSuccess,
      isLoaded: state.post.isLoaded,
      isLoading: state.post.isLoading,
      errorData: state.post.errorData
    }
  }
})

export const objectLoadingMutation = (prefix: string): Mutation<IObjectState<any>> => (state, { options } = {}) => {
  mutationLoadingStatus(state, null, prefix)
  if (prefix) {
    state[prefix].options = {
      ...state.options,
      ...options
    }
  } else {
    state.options = {
      ...state.options,
      ...options
    }
  }
}

export const objectSuccessMutation = (prefix: string): Mutation<IObjectState<any>> => (state, { data, options }) => {
  mutationSuccessStatus(state, data, prefix)
  if (prefix) {
    state[prefix].data = data
    state[prefix].options = {
      ...state.options,
      ...options
    }
  } else {
    state.data = data
    state.options = {
      ...state.options,
      ...options
    }
  }

}

export const objectErrorMutation = (prefix: string): Mutation<IObjectState<any>> => (state, data) => {
  mutationErrorStatus(state, data, prefix)
}

export const objectResetMutation = (prefix: string): Mutation<IObjectState<any>> => (state, data) => {
  mutationResetStatus(state, data, prefix)
  if (prefix) {
    state[prefix].options = {}
    state[prefix].data = null
  } else {
    state.options = {}
    state.data = null
  }
}

export const objectMutations = (prefix = ''): MutationTree<IObjectState<any>> => ({
  [addPrefix('loading', prefix)]: objectLoadingMutation(prefix),
  [addPrefix('success', prefix)]: objectSuccessMutation(prefix),
  [addPrefix('error', prefix)]: objectErrorMutation(prefix),
  [addPrefix('reset', prefix)]: objectResetMutation(prefix)
})

const actions = (options: any) => ({
  get: getObjectAction(options),
  put: putAction(options),
  post: postObjectAction(options),
  delete: deleteAction(options),
  clear: clearAction(options)
})

export const ObjectDispatchHookSuccess = ({ dispatch }, data: object) => {
  dispatch('hookSuccess', data)
}

export const objectDispatchHookLoading = ({ dispatch }, data: object = {}) => {
  dispatch('hookLoading', data)
}

export const ObjectDispatchHookError = ({ dispatch }, data: object) => {
  dispatch('hookError', data)
}

export const getObjectAction = (options: (ctx: IStateContext, data: any) => IActionOptions) => {
  return async (ctx: ActionContext<IObjectState<any>, IState>, data: any) => {
    commitWithPrefixLoading(ctx.commit)
    objectDispatchHookLoading(ctx)
    try {
      const res = await NewRequester.get<any>(options(ctx, data).baseURL,
        getRequestObjectOption(ctx, options, data))
      commitWithPrefixSuccess(ctx.commit, res.data)
      ObjectDispatchHookSuccess(ctx, res.data)
    } catch (e) {
      commitWithPrefixError(ctx.commit, e)
      ObjectDispatchHookError(ctx, e)
    }
  }
}

const getPrefix = (data, prefix) => _get(data, 'options.isPrefix', false) ? prefix : ''

export const postObjectAction = (options: (ctx: IStateContext, data: Post) => IActionOptions) => {
  return async (ctx: IStateContext, data: Post) => {
    const prefix = getPrefix(options(ctx, data), 'post')
    commitWithPrefixLoading(ctx.commit, { ...(options(ctx, data).params || {}) }, prefix)
    objectDispatchHookLoading(ctx, data)
    try {
      const res = await NewRequester.post<any>(options(ctx, data).baseURL, data.data,
        getRequestObjectOption(ctx, options, data))
      commitWithPrefixSuccess(ctx.commit, res.data, { ...(options(ctx, data).params || {}) }, prefix)
      ObjectDispatchHookSuccess(ctx, res.data)
    } catch (e) {
      commitWithPrefixError(ctx.commit, e, prefix)
      ObjectDispatchHookError(ctx, e)
    }
  }
}

const putAction = (options: (ctx: IStateContext) => IActionOptions) => {
  return async (ctx: IStateContext, { data }: Post) => {
    const prefix = getPrefix(options(ctx), 'put')
    commitWithPrefixLoading(ctx.commit, { ...(options(ctx).params || {}) }, prefix)
    objectDispatchHookLoading(ctx, data)
    try {
      const res = await NewRequester.put<any>(options(ctx).baseURL, data, getRequestObjectOption(ctx, options, data))
      commitWithPrefixSuccess(ctx.commit, res.data, { ...(options(ctx).params || {}) }, prefix)
      ObjectDispatchHookSuccess(ctx, res.data)
    } catch (e) {
      commitWithPrefixError(ctx.commit, e, prefix)
      ObjectDispatchHookError(ctx, e)
    }
  }
}

const deleteAction = (options: (ctx: IStateContext) => IActionOptions) => {
  return async (ctx: IStateContext, data: Del) => {
    const prefix = getPrefix(options(ctx), 'delete')
    commitWithPrefixLoading(ctx.commit, { ...(options(ctx).params || {}) }, prefix)
    objectDispatchHookLoading(ctx, data)
    try {
      const res = await NewRequester.delete<any>(options(ctx).baseURL, getRequestObjectOption(ctx, options, data))
      commitWithPrefixSuccess(ctx.commit, res.data, { ...(options(ctx).params || {}) }, prefix)
      ObjectDispatchHookSuccess(ctx, res.data)
    } catch (e) {
      commitWithPrefixError(ctx.commit, e, prefix)
      ObjectDispatchHookError(ctx, e)
    }
  }
}

const clearAction = (options: (ctx: IStateContext) => IActionOptions) => {
  return async (ctx: IStateContext) => {
    ctx.commit(addPrefix('reset', ''))
  }
}

const getObjectTypes = (prefix: string) => ({
    Get: get(prefix),
    Put: put(prefix),
    Post: post(prefix),
    Delete: del(prefix),
    Clear: clear(prefix)
  }
)

const getStateMeta = (prefix: string): IObjectStateMeta => ({
  path: prefix.replace('/', '.'),
  getterTypes: getterTypes(prefix),
  actionTypes: getObjectTypes(prefix)
}) as any

export const object = {
  state: defaultObjectState,
  getterTypes: getterTypes,
  getters: getters,
  mutations: objectMutations,
  actions: actions,
  getStateMeta: getStateMeta
}

