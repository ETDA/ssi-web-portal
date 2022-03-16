import {IObjectState, IPageState} from '~/lib/state/types'
import {Context} from '@nuxt/types'
import AppRepository from '~/repositories/AppRepository'
import AuthRepository from '~/repositories/AuthRepository'
import {IFormState} from '~/store/form'
import {IMeState} from '~/models/meModel'

export interface IState {
  app: IAppState,
  form: IFormState,
  route: IRouteState
  user: {
    users: IPageState<any>
    login: IObjectState<any>,
    logout: IObjectState<any>
    me: IObjectState<IMeState>
  },
  project: {
    projects: IPageState<any>
  }
}

export interface IRouteState {
  name: string;
  meta: any[];
  path: string;
  hash: string;
  query: {
    [key: string]: string
  };
  params: {
    [key: string]: string
  };
  fullPath: string;
}

export interface IContext extends Context {
  app: {
    $app: AppRepository
    $auth: AuthRepository
    $pageNumber: number
    query: {
      [key: string]: string
    }
    pageNumber: number
  }
  params: any
  $cookies: any
}

export interface IPageAPIMeta<T> {
  current: string
  items: T[]
  next: string
  prev: string
  total: number
}

export interface IPageMeta {
  title?: string
  sub_title?: string
  breadcrumb?: IBreadcrumbItemState[]
}

export interface IDocMeta {
  title?: string
}

export interface IAppState {
  doc: IDocMeta,
  page: IPageMeta,
  sidebar: ISidebarItemState[]
}

export interface IBreadcrumbItemState {
  name: string
  isActive?: boolean
  icon?: string
  to?: string
}

export interface ISidebarItemState {
  type?: string
  name: string
  icon?: string
  to?: string
  isHide?: boolean
  isActive?: boolean
  children?: ISidebarItemState[]
}


