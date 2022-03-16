import {
  IActionOptions,
  IListState,
  IMutationData,
  IObjectState,
  IPageOptions,
  IStateContext,
  IStatus
} from '~/lib/state/types'
import {_clone, _findIndex, _get, _isUndefined} from '~/utils/lodash'
import {Core} from '~/core/Core'
import {StringHelper} from '~/utils/StringHelper'
import {ActionContext} from 'vuex'
import {IState} from '~/store/types'
import {AxiosRequestConfig} from 'axios'

export const getRequestObjectOption = (
  ctx: ActionContext<IObjectState<any>, IState>,
  options: (ctx: IStateContext, data: any) => IActionOptions,
  data: any = null): AxiosRequestConfig => {
  return {
    ...Core.DefaultAPIOptions(ctx),
    ...options(ctx, data).requestOptions,
    params: {
      ...options(ctx, data).params
    },
    headers: {
      ...Core.DefaultAPIOptions(ctx).headers,
      ...options(ctx, data).headers
    }
  }
}

export const getRequestPageOption = (
  ctx: ActionContext<IObjectState<any>, IState>,
  options: (ctx: IStateContext, data: any) => IActionOptions,
  data: any = null): AxiosRequestConfig => ({
  ...Core.DefaultAPIOptions(ctx),
  ...options(ctx, data).requestOptions,
  params: {
    page: data.page,
    limit: Core.config.LIMIT_PER_PAGE,
    ...(data.q && { q: data.q }),
    ...options(ctx, data).params
  },
  headers: {
    ...Core.DefaultAPIOptions(ctx).headers,
    ...options(ctx, data).headers
  }
})

export const commonObjectState = (): IObjectState<any> => ({
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoaded: false,
  errorData: null,
  options: {},
  data: null
})

export const commonListState = (): IListState<any> => ({
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoaded: false,
  errorData: null,
  options: {},
  items: []
})

export const mutationLoadingStatus = (state: IStatus, data?: any, prefix?: string) => {
  if (prefix) {
    state[prefix].isLoading = true
    state[prefix].isError = false
    state[prefix].isLoaded = false
    state[prefix].isSuccess = false
    state[prefix].errorData = null
  } else {
    state.isLoading = true
    state.isLoaded = false
    state.isError = false
    state.isSuccess = false
    state.errorData = null
  }
}

export const mutationErrorStatus = (state: IStatus, data: any, prefix?: string) => {
  if (prefix) {
    state[prefix].isLoading = false
    state[prefix].isLoaded = true
    state[prefix].isError = true
    state[prefix].isSuccess = false
    state[prefix].errorData = data
  } else {
    state.isLoading = false
    state.isLoaded = true
    state.isError = true
    state.isSuccess = false
    state.errorData = data
  }
}

export const mutationSuccessStatus = (state: any, data?: IMutationData | null, prefix?: string) => {
  const getPrimaryKeyFromData = () => _get(data, 'options.primary', Core.config.DEFAULT_PRIMARY)
  const getIdFromData = () => _get(data, 'data.id', null)
  const getPrimaryKey = (item: any): string => _get(item, getPrimaryKeyFromData(), '')

  if (prefix) {
    state[prefix].isLoading = false
    state[prefix].isError = false
    state[prefix].isSuccess = true
    state[prefix].isLoaded = true
    state[prefix].errorData = null
    if (!_isUndefined(state[prefix].data)) {
      state[prefix].data = _get(data, 'data', null)
    }

    if (prefix === 'update') {
      state.find.data = _get(data, 'data', null)
      if (state.items.length > 0) {
        const index = _findIndex(state.items, (item) => {
          return getPrimaryKey(item) ===
            _get(data, `data[${getPrimaryKeyFromData()}]`, Core.config.DEFAULT_PRIMARY)
        })

        if (index !== -1) {
          const temp = _clone(state.items)
          temp[index] = _get(data, 'data', null)
          state.items = temp
        }
      }
    }

    if (prefix === 'add') {
      const newData = _get(data, 'data', null)
      if (newData)
        state.items = [newData, ...state.items]
    }

    if (prefix === 'delete') {
      state.items = state.items.filter((item: any) => {
        return getPrimaryKey(item) !== getIdFromData()
      })

    }
  } else {
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.isLoaded = true
    state.errorData = null
  }

}

export const mutationResetStatus = (state: IStatus, data?: any, prefix?: string) => {
  if (prefix) {
    state[prefix].isLoading = false
    state[prefix].isLoaded = false
    state[prefix].isError = false
    state[prefix].isSuccess = false
    state[prefix].errorData = null
  } else {
    state.isLoaded = false
    state.isLoading = false
    state.isError = false
    state.isSuccess = false
    state.errorData = null
  }
}

export const addPrefix = (text: string, prefix: string): string => {
  return `${prefix ? `${prefix}` : ''}${prefix ? StringHelper.toPascalCase(text) : text}`
}

export const commitWithPrefixLoading = (commit, options: object = {}, prefix = '') => {
  commit(addPrefix('loading', prefix), { options })
}

export const commitWithPrefixSuccess = (commit, data: object, options: object = {}, prefix = '') => {
  commit(addPrefix('success', prefix), { data, options })
}

export const commitWithPrefixError = (commit, data: any, prefix = '') => {
  commit(addPrefix('error', prefix), _get(data, 'response.data', Core.config.DEFAULT_ERROR_MSG))
}

export const commitPageLoading = (commit, options: IPageOptions) => {
  commit('loading', { options })
}

export const commitPageSuccess = (commit, data: any[], options: IPageOptions) => {
  commit('success', { data, options })
}


export const isChangeWithFalse = (value: boolean, oldValue: boolean): boolean => {
  return oldValue !== value && !value
}

export const isChangeWithTrue = (value: boolean, oldValue: boolean): boolean => {
  return oldValue !== value && value
}
