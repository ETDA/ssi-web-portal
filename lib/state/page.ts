import {_clone, _findIndex, _get, _isUndefined} from '~/utils/lodash'
import {
  commitPageLoading,
  commitPageSuccess,
  commitWithPrefixError,
  commitWithPrefixLoading,
  commitWithPrefixSuccess,
  commonObjectState,
  getRequestObjectOption,
  getRequestPageOption,
  mutationErrorStatus,
  mutationLoadingStatus,
  mutationResetStatus,
  mutationSuccessStatus
} from '~/lib/state/util'
import {NewRequester} from '~/lib/Requester'
import {
  Add,
  add,
  Del,
  del,
  find,
  Find,
  GetByPage,
  getByPage,
  IActionOptions,
  IPageAction,
  IPageState,
  IPageStateMeta,
  IStateContext,
  IStatus,
  Update,
  update
} from '~/lib/state/types'
import {Core} from '~/core/Core'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IState} from '~/store/types'

const deleteByIdMutation = (state: any, id: string) => {
    const totalCount = +state.options.totalCount - 1
    const removeData = state.data.filter((value: any) => value.id !== id)
    state.data = removeData
    state.options = {
        ...state.options,
        count: removeData.length,
        totalCount: totalCount,
        pageCount: Math.ceil(totalCount / Core.config.LIMIT_PER_PAGE)
    }
}

export const appendDataMutation = (state, data) => {
    const totalCount = +state.options.totalCount + 1
    state.options = {
        ...state.options,
        count: data.length,
        totalCount: totalCount,
        pageCount: Math.ceil(totalCount / Core.config.LIMIT_PER_PAGE)
    }
    state.data = [data, ...state.data]
}

export const updateDataMutation = (state, data) => {
    const index = _findIndex(state.data, (v: any) => v.id === data.id)
    const newData = _clone(state.data)
    newData[index] = data.data
    state.data = newData
}

const initPageOptions = () => ({
    currentPageCount: 0,
    currentPage: 1,
    totalPage: 0,
    totalCount: 0,
    search: '',
    primary: Core.config.DEFAULT_PRIMARY
})

export const defaultPageState = (): IPageState<any> => ({
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoaded: false,
    errorData: null,
    options: initPageOptions(),
    items: [],
    find: commonObjectState(),
    add: commonObjectState(),
    delete: commonObjectState(),
    update: commonObjectState()
})

const mutations = (): MutationTree<IPageState<any>> => ({
    loading: (state, {options} = {}) => {
        mutationLoadingStatus(state, null)
        state.items = []
        state.options = {
            ...state.options,
            ...options
        }
    },
    success: (state, {data, options}) => {
        mutationSuccessStatus(state, data)
        state.items = data
        state.options = {
            ...state.options,
            ...options,
            currentPageCount: data.length,
            totalPage: Math.ceil(options.totalCount / Core.config.LIMIT_PER_PAGE)
        }
    },
    error: (state, data) => {
        mutationErrorStatus(state, data)
    },
    reset: (state, data) => {
        mutationResetStatus(state, data)
        state.options = initPageOptions()
        state.items = []
    },
    deleteById: deleteByIdMutation,
    deleteLoading: (state, data) => mutationLoadingStatus(state, data, 'delete'),
    deleteSuccess: (state, data) => mutationSuccessStatus(state, data, 'delete'),
    deleteError: (state, data) => mutationErrorStatus(state, data, 'delete'),
    appendData: appendDataMutation,
    addLoading: (state, data) => mutationLoadingStatus(state, data, 'add'),
    addSuccess: (state, data) => mutationSuccessStatus(state, data, 'add'),
    addError: (state, data) => mutationErrorStatus(state, data, 'add'),
    findLoading: (state, data) => mutationLoadingStatus(state, data, 'find'),
    findSuccess: (state, data) => mutationSuccessStatus(state, data, 'find'),
    findError: (state, data) => mutationErrorStatus(state, data, 'find'),
    updateData: updateDataMutation,
    updateLoading: (state, data) => mutationLoadingStatus(state, data, 'update'),
    updateSuccess: (state, data) => mutationSuccessStatus(state, data, 'update'),
    updateError: (state, data) => mutationErrorStatus(state, data, 'update')
})
const actions = (options: (ctx: IStateContext, data: any) => IActionOptions): ActionTree<IPageState<any>, IState> => ({
    get: getAction(options),
    delete: deleteAction(options),
    find: findAction(options),
    store: addAction(options),
    update: updateAction(options)
})

const getters = (): GetterTree<IPageState<any>, IState> => ({
    status(state): IStatus {
        return {
            isError: state.isError,
            isSuccess: state.isSuccess,
            isLoading: state.isLoading,
            isLoaded: state.isLoaded,
            errorData: state.errorData
        }
    },
    findStatus(state): IStatus {
        return {
            isError: state.find.isError,
            isSuccess: state.find.isSuccess,
            isLoading: state.find.isLoading,
            isLoaded: state.find.isLoaded,
            errorData: state.find.errorData
        }
    },
    updateStatus(state): IStatus {
        return {
            isError: state.update.isError,
            isSuccess: state.update.isSuccess,
            isLoading: state.update.isLoading,
            isLoaded: state.update.isLoaded,
            errorData: state.update.errorData
        }
    },
    deleteStatus(state): IStatus {
        return {
            isError: state.delete.isError,
            isSuccess: state.delete.isSuccess,
            isLoading: state.delete.isLoading,
            isLoaded: state.delete.isLoaded,
            errorData: state.delete.errorData
        }
    },
    addStatus(state): IStatus {
        return {
            isError: state.add.isError,
            isSuccess: state.add.isSuccess,
            isLoading: state.add.isLoading,
            isLoaded: state.add.isLoaded,
            errorData: state.add.errorData
        }
    }
})

const getterTypes = (prefix: string) => ({
    status: `${prefix}/status`,
    findStatus: `${prefix}/findStatus`,
    updateStatus: `${prefix}/updateStatus`,
    deleteStatus: `${prefix}/deleteStatus`,
    addStatus: `${prefix}/addStatus`
})

const getAction = (options: (ctx: IStateContext, data: GetByPage) => IActionOptions) => {
    return async (ctx: IStateContext, data: GetByPage) => {
        commitPageLoading(ctx.commit, {
            currentPage: data.page,
            search: data.q,
            ...options(ctx, data).options,
            ...(options(ctx, data).params || {}),
            primary: _get(options(ctx, data), 'options.primary', 'id')
        })
        try {
            if (options(ctx, data).options?.isMock) {
                const res = {
                    data: {
                        items: options(ctx, data).options?.mockItems || [],
                        total: (options(ctx, data).options?.mockItems || []).length
                    }
                }
                if (ctx.state.options.search === data.q) {
                    commitPageSuccess(ctx.commit, res.data.items, {
                        totalCount: res.data.total,
                        search: data.q,
                        ...options(ctx, data).options,
                        ...(options(ctx, data).params || {}),
                        primary: _get(options(ctx, data), 'options.primary', 'id')
                    })
                }
            } else {
                const res = await NewRequester.get<any>(options(ctx, data).baseURL, getRequestPageOption(ctx, options, data))
                if (ctx.state.options.search === data.q) {
                    commitPageSuccess(ctx.commit, _isUndefined(options(ctx, data).options?.transformItems) ? res.data.items : options(ctx, data).options?.transformItems!(res.data.items), {
                        totalCount: res.data.total || res.data.total_rows,
                        search: data.q,
                        ...options(ctx, data).options,
                        ...(options(ctx, data).params || {}),
                        primary: _get(options(ctx, data), 'options.primary', 'id')
                    })
                }
            }
        } catch (e) {
            commitWithPrefixError(ctx.commit, e)
        }
    }
}

const findAction = (options: (ctx: IStateContext, data: Find) => IActionOptions) => {
    return async (ctx: IStateContext, data: Find) => {
        const prefix = _get(options(ctx, data), 'options.prefix', 'find')

        commitWithPrefixLoading(ctx.commit, {
            ...options(ctx, data).options,
            ...(options(ctx, data).params || {}),
            primary: _get(options(ctx, data), 'options.primary', 'id')
        }, prefix)
        try {
            if (options(ctx, data).options?.isMock) {
                const res = {
                    data: options(ctx, data).options?.mockData
                }

                commitWithPrefixSuccess(ctx.commit, res.data, {
                    ...options(ctx, data).options,
                    ...(options(ctx, data).params || {}),
                    primary: _get(options(ctx, data), 'options.primary', 'id')
                }, prefix)
            } else {
                const res = await NewRequester.get<any>(
                    options(ctx, data).baseFindURL || `${options(ctx, data).baseURL}/${data.id}`,
                    getRequestObjectOption(ctx, options, data))

                commitWithPrefixSuccess(ctx.commit, _isUndefined(options(ctx, data).options?.transformData) ? res.data : options(ctx, data).options?.transformData!(res.data), {
                    ...options(ctx, data).options,
                    ...(options(ctx, data).params || {}),
                    primary: _get(options(ctx, data), 'options.primary', 'id')
                }, prefix)
            }
        } catch (e) {
            commitWithPrefixError(ctx.commit, e, prefix)
        }
    }
}

const deleteAction = (options: (ctx: IStateContext, data: Del) => IActionOptions) => {
    return async (ctx: IStateContext, data: Del) => {
        const prefix = _get(options(ctx, data), 'options.prefix', 'delete')

        commitWithPrefixLoading(ctx.commit, {
            id: data.id,
            ...options(ctx, data).options,
            ...(options(ctx, data).params || {}),
            primary: _get(options(ctx, data), 'options.primary', 'id')
        }, prefix)
        try {
            const res = await NewRequester.delete<any>(
                options(ctx, data).baseDeleteURL || `${options(ctx, data).baseURL}/${data.id}`,
                getRequestObjectOption(ctx, options, data))

            commitWithPrefixSuccess(ctx.commit, {id: data.id},
                {
                    ...options(ctx, data).options,
                    ...(options(ctx, data).params || {}),
                    primary: _get(options(ctx, data), 'options.primary', 'id')
                },
                prefix)
        } catch (e) {
            commitWithPrefixError(ctx.commit, e, prefix)
        }
    }
}

const addAction = (options: (ctx: IStateContext, data: Add) => IActionOptions) => {
    return async (ctx: IStateContext, data: Add) => {
        const prefix = _get(options(ctx, data), 'options.prefix', 'add')
        commitWithPrefixLoading(ctx.commit, {
            ...options(ctx, data).options,
            primary: _get(options(ctx, data), 'options.primary', 'id')
        }, prefix)
        try {
            const res = await NewRequester.post<any>(
                options(ctx, data).baseAddURL || `${options(ctx, data).baseURL}`, data.data,
                getRequestObjectOption(ctx, options, data))

            commitWithPrefixSuccess(ctx.commit, res.data, {
                ...options(ctx, data).options,
                ...(options(ctx, data).params || {}),
                primary: _get(options(ctx, data), 'options.primary', 'id')
            }, prefix)
        } catch (e) {
            commitWithPrefixError(ctx.commit, e, prefix)
        }
    }
}

const updateAction = (options: (ctx: IStateContext, data: Update) => IActionOptions) => {
    return async (ctx: IStateContext, data: Update) => {
        const prefix = _get(options(ctx, data), 'options.prefix', 'update')

        commitWithPrefixLoading(ctx.commit, {
            ...options(ctx, data).options,
            ...(options(ctx, data).params || {}),
            primary: _get(options(ctx, data), 'options.primary', 'id')
        }, prefix)
        try {
            const res = await NewRequester.put<any>(
                options(ctx, data).baseUpdateURL || `${options(ctx, data).baseURL}/${data.id}`, data.data,
                getRequestObjectOption(ctx, options, data))

            commitWithPrefixSuccess(ctx.commit, res.data, {
                ...options(ctx, data).options,
                ...(options(ctx, data).params || {}),
                primary: _get(options(ctx, data), 'options.primary', 'id')
            }, prefix)
        } catch (e) {
            commitWithPrefixError(ctx.commit, e, prefix)
        }
    }
}

const getPageTypes = (prefix: string): IPageAction => ({
        GetPage: getByPage(prefix),
        Find: find(prefix),
        Update: update(prefix),
        Delete: del(prefix),
        Add: add(prefix)
    }
) as any

const getStateMeta = (prefix: string): IPageStateMeta => ({
    path: prefix.replace('/', '.'),
    prefix: prefix,
    getterTypes: getterTypes(prefix),
    actionTypes: getPageTypes(prefix)
})

export const page = {
    state: defaultPageState,
    getterTypes: getterTypes,
    getters: getters,
    mutations: mutations,
    actions: actions,
    getStateMeta: getStateMeta
}
