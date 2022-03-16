import { Ref, ref, UnwrapRef } from '@vue/composition-api'
import { IPageOptions, IStatus } from '~/lib/state/types'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { Core } from '~/core/Core'
import { NewRequester } from '~/lib/Requester'
import { get } from '@vueuse/core'
import { _findIndex, _get, _shuffle } from '~/utils/lodash'
import { AxiosRequestConfig } from 'axios'

const initPageOptions = () => ({
  currentPageCount: 0,
  currentPage: 1,
  totalPage: 0,
  totalCount: 0,
  search: '',
  primary: Core.config.DEFAULT_PRIMARY
})

export interface IPageFetchLoaderOptions {
  isMock?: boolean
  params?: {
    [key: string]: any
  }

  [key: string]: any
}

export interface IPageDeleteLoaderOptions {
  isMock?: boolean
  params?: {
    [key: string]: any
  }

  [key: string]: any
}

export interface IPageAddLoaderOptions {
  isMock?: boolean

  [key: string]: any
}

export interface IPageLoaderOptions<T> {
  baseURL: string
  primary?: string
  mockItems?: T[],
  getFetchBaseURL?: (opts: IPageFetchLoaderOptions) => string
  getDeleteBaseURL?: (id: string, opts: IPageDeleteLoaderOptions) => string
  getFindBaseURL?: (id: string, opts: IPageFetchLoaderOptions) => string
  getAddBaseURL?: (opts: IPageAddLoaderOptions) => string
  getUpdateBaseURL?: (id: string, opts: IPageFetchLoaderOptions) => string
  getFetchOptions?: (opts: IPageFetchLoaderOptions) => AxiosRequestConfig
  getFindOptions?: (opts: IPageFetchLoaderOptions) => AxiosRequestConfig
  getAddOptions?: (opts: IPageFetchLoaderOptions) => AxiosRequestConfig
  getUpdateOptions?: (opts: IPageFetchLoaderOptions) => AxiosRequestConfig
  getDeleteOptions?: (opts: IPageFetchLoaderOptions) => AxiosRequestConfig
  transformFindItem?: (data: T) => any
  transformFetchItems?: (data: T[]) => any[]
}

export interface IUsePageLoader<T> {
  status: Ref<UnwrapRef<IStatus>>
  findStatus: Ref<UnwrapRef<IStatus>>
  addStatus: Ref<UnwrapRef<IStatus>>
  updateStatus: Ref<UnwrapRef<IStatus>>
  deleteStatus: Ref<UnwrapRef<IStatus>>
  options: Ref<UnwrapRef<IPageOptions>>
  clear: () => void
  fetch: (page?: number, query?: string, opts?: IPageFetchLoaderOptions) => Promise<any>
  search: (query: string, opts?: IPageFetchLoaderOptions) => Promise<any>
  find: (id: string, opts?: any) => Promise<any>
  update: (id: string, data: any, opts?: any) => Promise<any>
  add: (data: any, opts?: IPageAddLoaderOptions) => Promise<any>
  remove: (id: string, opts?: IPageDeleteLoaderOptions) => Promise<any>
  setLoading: () => void
  setFindLoading: () => void
  items: Ref<UnwrapRef<T[]>>
  findItem: Ref<UnwrapRef<T | null>>
  addItem: Ref<UnwrapRef<T | null>>
  updateItem: Ref<UnwrapRef<T | null>>
}

export interface IUseObjectLoader<T> {
  status: Ref<UnwrapRef<IStatus>>
  data: Ref<UnwrapRef<T | null>>
  run: any
  clear: () => void
  setLoading: () => void
}

export const usePageToTableOptions = (pageLoader: any) => {
  return {
    ...pageLoader,
    options: get(pageLoader.options),
    deleteStatus: get(pageLoader.deleteStatus),
    status: get(pageLoader.status)
  }
}

export const usePageLoader = <T> (loaderOptions: IPageLoaderOptions<T>): IUsePageLoader<T> => {
  const status = ref<IStatus>(ObjectHelper.createStatus())
  const items = ref<T[]>([])
  const findItem = ref<T | null>(null)
  const addItem = ref<T | null>(null)
  const updateItem = ref<T | null>(null)
  const findStatus = ref<IStatus>(ObjectHelper.createStatus())
  const addStatus = ref<IStatus>(ObjectHelper.createStatus())
  const updateStatus = ref<IStatus>(ObjectHelper.createStatus())
  const deleteStatus = ref<IStatus>(ObjectHelper.createStatus())
  const options = ref<IPageOptions>(initPageOptions())
  const clear = () => {
    findStatus.value = ObjectHelper.createStatus()
    deleteStatus.value = ObjectHelper.createStatus()
    addStatus.value = ObjectHelper.createStatus()
    updateStatus.value = ObjectHelper.createStatus()
    findItem.value = null
    updateItem.value = null
    status.value = ObjectHelper.createStatus()
    options.value = initPageOptions()
    items.value = []

  }

  const setLoading = () => {
    status.value = ObjectHelper.toLoadingStatus(status.value)
  }

  const setFindLoading = () => {
    findStatus.value = ObjectHelper.toLoadingStatus(findStatus.value)
  }

  const fetch = async (page: number = 1, query: string = '', opts: IPageFetchLoaderOptions = {}) => {
    status.value = ObjectHelper.toLoadingStatus(status.value)
    options.value = {
      ...options.value,
      ...opts,
      currentPage: page,
      search: query,
      primary: loaderOptions.primary ?? 'id'
    }
    try {
      if (opts.isMock) {
        await new Promise(resolve => {
          setTimeout(resolve, 500)
        })
        const res: any = {
          data: {
            items: loaderOptions.mockItems || [],
            totalCount: (loaderOptions.mockItems || []).length
          }
        }

        items.value = _shuffle(res.data.items)
        options.value = {
          ...options.value,
          currentPageCount: items.value.length,
          totalCount: res.data.total,
          totalPage: Math.ceil(res.data.total / Core.config.LIMIT_PER_PAGE)
        }
        status.value = ObjectHelper.toSuccessStatus(status.value)
      } else {
        const reqOptions = loaderOptions.getFetchOptions?.(opts) ?? {}
        const limit = reqOptions.params?.limit || Core.config.LIMIT_PER_PAGE

        reqOptions.params = {
          limit: limit,
          page: page
        }

        if (query.trim()) {
          reqOptions.params = {
            q: query.trim(),
            limit: limit,
            page: page
          }
        }

        if (opts.params) {
          reqOptions.params = {
            ...reqOptions.params,
            ...opts.params
          }
        }

        const {
          items: itemss,
          ...moreOptions
        } = (await NewRequester.get<any>(loaderOptions.getFetchBaseURL ? loaderOptions.getFetchBaseURL(opts) : loaderOptions.baseURL, reqOptions)).data
        items.value = loaderOptions.transformFetchItems ? loaderOptions.transformFetchItems(itemss) : itemss
        options.value = {
          ...options.value,
          currentPageCount: items.value?.length,
          totalCount: moreOptions.total,
          totalPage: Math.ceil(moreOptions.total / moreOptions.limit)
        }

        status.value = ObjectHelper.toSuccessStatus(status.value)
      }

    } catch (e) {
      status.value = ObjectHelper.toErrorStatus(status.value, e.response?.data)
    }

    status.value = ObjectHelper.toCompleteStatus(status.value)

  }

  const find = async (id: string, opts: {
    isMock?: boolean
  } = {}) => {
    findStatus.value = ObjectHelper.toLoadingStatus(findStatus.value)
    try {
      if (opts.isMock) {
        const res: any = {
          data: loaderOptions.mockItems![0]
        }

        findItem.value = res.data
        findStatus.value = ObjectHelper.toSuccessStatus(findStatus.value)
      } else {
        const reqOptions = loaderOptions.getFindOptions?.(opts) ?? {}
        const { data } = await NewRequester.get<any>(loaderOptions.getFindBaseURL ? loaderOptions.getFindBaseURL(id, opts) : `${loaderOptions.baseURL}/${id}`, reqOptions)
        findItem.value = loaderOptions.transformFindItem ? loaderOptions.transformFindItem(data) : data
        findStatus.value = ObjectHelper.toSuccessStatus(findStatus.value)
      }

    } catch (e) {
      findStatus.value = ObjectHelper.toErrorStatus(findStatus.value, e.response.data)
    }

    findStatus.value = ObjectHelper.toCompleteStatus(findStatus.value)
  }

  const add = async (data: any, opts: IPageAddLoaderOptions = {}) => {
    addStatus.value = ObjectHelper.toLoadingStatus(addStatus.value)
    try {
      let item = null
      if (opts.isMock) {
        const res: any = {
          data: loaderOptions.mockItems![0]
        }

        addItem.value = res.data
        addStatus.value = ObjectHelper.toSuccessStatus(addStatus.value)
      } else {
        const reqOptions = loaderOptions.getAddOptions?.(opts) ?? {}
        const { data: itemm } = await NewRequester.post<any>(loaderOptions.getAddBaseURL ? loaderOptions.getAddBaseURL(opts) : loaderOptions.baseURL, data, reqOptions)
        addItem.value = itemm
        item = itemm
        addStatus.value = ObjectHelper.toSuccessStatus(addStatus.value)
      }

      items.value = [item!, ...items.value]
    } catch (e) {
      addStatus.value = ObjectHelper.toErrorStatus(addStatus.value, e.response.data)
    }

    addStatus.value = ObjectHelper.toCompleteStatus(addStatus.value)
  }

  const update = async (id: string, data: any, opts: {
    isMock?: boolean
  } = {}) => {
    updateStatus.value = ObjectHelper.toLoadingStatus(updateStatus.value)
    try {
      let finalItem = null
      if (opts.isMock) {
        const res: any = {
          data: loaderOptions.mockItems![0]
        }

        updateItem.value = res.data
        finalItem = res.data
        updateStatus.value = ObjectHelper.toSuccessStatus(updateStatus.value)
      } else {
        const reqOptions = loaderOptions.getUpdateOptions?.(opts) ?? {}
        const { data: item } = await NewRequester.put<any>(loaderOptions.getUpdateBaseURL ? loaderOptions.getUpdateBaseURL(id, opts) : `${loaderOptions.baseURL}/${id}`, data, reqOptions)
        updateItem.value = item
        finalItem = item
        updateStatus.value = ObjectHelper.toSuccessStatus(updateStatus.value)
      }

      findItem.value = finalItem!
      const index = _findIndex(items.value, item => item.id === id)
      if (index !== -1) {
        const itemsTemp = items.value
        itemsTemp[index] = finalItem!
        items.value = itemsTemp
      }
    } catch (e) {
      updateStatus.value = ObjectHelper.toErrorStatus(updateStatus.value, e.response.data)
    }

    updateStatus.value = ObjectHelper.toCompleteStatus(updateStatus.value)
  }

  const search = async (query: string = '', opts: IPageFetchLoaderOptions = {}) => {
    await fetch(1, query, opts)
  }

  const remove = async (id: string, opts: IPageDeleteLoaderOptions = {}) => {
    const primaryKey = loaderOptions.primary ?? 'id'
    const getPrimaryKey = (item: any): string => _get(item, primaryKey, '')
    deleteStatus.value = ObjectHelper.toLoadingStatus(deleteStatus.value)
    try {
      if (opts.isMock) {
        deleteStatus.value = ObjectHelper.toSuccessStatus(deleteStatus.value)
      } else {
        const reqOptions = loaderOptions.getDeleteOptions?.(opts) ?? {}
        await NewRequester.delete<any>(loaderOptions.getDeleteBaseURL ? loaderOptions.getDeleteBaseURL(id, opts) : `${loaderOptions.baseURL}/${id}`, reqOptions)
        deleteStatus.value = ObjectHelper.toSuccessStatus(deleteStatus.value)
      }

      items.value = items.value.filter((item: any) => {
        return getPrimaryKey(item) !== id
      })

    } catch (e) {
      deleteStatus.value = ObjectHelper.toErrorStatus(deleteStatus.value, e.response.data)
    }

    deleteStatus.value = ObjectHelper.toCompleteStatus(deleteStatus.value)
  }

  return {
    items,
    options,
    status,
    deleteStatus,
    fetch,
    search,
    remove,
    find,
    findItem,
    findStatus,
    add,
    addItem,
    addStatus,
    updateItem,
    updateStatus,
    update,
    setLoading,
    setFindLoading,
    clear
  }
}
