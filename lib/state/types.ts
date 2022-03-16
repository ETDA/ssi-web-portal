import {ActionContext, Store} from 'vuex'
import {IState} from '~/store/types'
import {AxiosRequestConfig} from '~/node_modules/axios'

export interface IPageOptions {
    currentPageCount?: number
    currentPage?: number
    totalPage?: number
    totalCount?: number
    search?: string
    primary?: string

    [key: string]: any
}

export interface IObjectState<T> {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    isLoaded: boolean,
    errorData: any | null,
    options: any,
    data: T

    [key: string]: any
}

export interface IListState<T> {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    isLoaded: boolean,
    errorData: any | null,
    options: any,
    items: T[]
}

export interface IStatus {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    isLoaded: boolean,
    errorData: any | null,
}

export interface IPageState<T> {
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    isLoaded: boolean,
    errorData: any | null,
    options: IPageOptions
    items: T[],
    find: IObjectState<any>
    add: IObjectState<any>
    delete: IObjectState<any>
    update: IObjectState<any>
}

export declare interface IAction {
    readonly type: string;
    payload?: any;
}

export class Get implements IAction {
    type = ''

    constructor(public data: any, public options: any = {}) {
    }
}

export class Post implements IAction {
    type = ''

    constructor(public data: any, public options: any = {}) {
    }
}

export class GetByPage implements IAction {
    type = ''

    constructor(public page: number = 1, public q: string = '', public options: any = {}) {
    }
}

export class Add implements IAction {
    type = ''

    constructor(public data: any, public options: any = {}) {
    }
}

export class Find implements IAction {
    type = ''

    constructor(public id: string, public options: any = {}) {
    }
}

export class Update implements IAction {
    type = ''

    constructor(public id: string, public data: any, public options: any = {}) {
    }
}

export class Put implements IAction {
    type = ''

    constructor(public data: any, public options: any = {}) {
    }
}

export class Del implements IAction {
    type = ''

    constructor(public id: string, public options: any = {}) {
    }
}

export class Clear implements IAction {
    type = ''
}

export const get = (prefix: string) => {
    return class implements Get {
        type = `${prefix}/get`

        constructor(public data: any, public options: any = {}) {
        }
    }
}
export const put = (prefix: string) => {
    return class implements Put {
        type = `${prefix}/put`

        constructor(public data: any, public options: any = {}) {
        }
    }
}

export const post = (prefix: string) => {
    return class implements Post {
        type = `${prefix}/post`

        constructor(public data: any = null, public options: any = {}) {
        }
    }
}

export const getByPage = (prefix: string) => {
    return class implements GetByPage {
        type = `${prefix}/get`

        constructor(public page: number = 1, public q: string = '', public options: any = {}) {
        }
    }
}

export const add = (prefix: string) => {
    return class implements Add {
        type = `${prefix}/store`

        constructor(public data: any, public options: any = {}) {
        }
    }
}

export const find = (prefix: string) => {
    return class implements Find {
        type = `${prefix}/find`

        constructor(public id: string, public options: any = {}) {
        }
    }
}

export const update = (prefix: string) => {
    return class implements Update {
        type = `${prefix}/update`

        constructor(public id: string, public data: any, public options: any = {}) {
        }
    }
}

export const del = (prefix: string) => {
    return class implements Del {
        type = `${prefix}/delete`

        constructor(public id: string, public options: any = {}) {
        }
    }
}

export const clear = (prefix: string) => {
    return class Clear implements Clear {
        type = `${prefix}/clear`
    }
}

export interface IStore<T> extends Store<T> {
}

export interface IActionOptions {
    headers?: {
        [key: string]: any
    }
    params?: {
        [key: string]: any
    }
    requestOptions?: AxiosRequestConfig
    options?: {
        primary?: string
        isPrefix?: boolean
        prefix?: string
        isMock?: boolean,
        mockItems?: any[],
        mockData?: any,
        transformItems?: (data: any[]) => any[]
        transformData?: (data: any) => any
        [key: string]: any
    }
    baseURL: string
    basePostURL?: string
    baseGetURL?: string
    baseAddURL?: string
    baseFindURL?: string
    baseUpdateURL?: string
    baseDeleteURL?: string
}

export type IStateContext = ActionContext<any, IState>

export interface IPageAction {
    GetPage: (page: number, query?: string, options?: any) => void
    Find: (id: string, options?: any) => void
    Update: (id: string, data: any, options?: any) => void
    Delete: (id: string, options?: any) => void
    Add: (data: any, options?: any) => void
}

export interface IObjectAction {
    Get: (data?: object, options?: any) => void
    Put: (data?: object, options?: any) => void
    Post: (data?: object, options?: any) => void
    Clear: () => void
}

export interface IPageStateMeta {
    path: string
    prefix: string
    getterTypes: {
        status: string
        findStatus: string
        updateStatus: string
        addStatus: string
        deleteStatus: string
    }
    actionTypes: IPageAction
}

export interface IObjectStateMeta {
    path: string
    getterTypes: {
        status: string,
        putStatus: string,
        postStatus: string,
    }
    actionTypes: IObjectAction
}

export interface IMutationData {
    data: any
    options?: {
        primary?: string
        id?: string
    }
}

export interface IError {
    code: string
    message: string
}
