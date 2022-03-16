import {IAction} from '~/lib/state/types'
import {IAppState, IDocMeta, IPageMeta, IRouteState, ISidebarItemState} from '~/store/types'
import {Core} from '~/core/Core'

const prefix = 'app'

export const state = (): IAppState => ({
  page: {
    title: '',
    sub_title: '',
    breadcrumb: []
  },
  doc: {
    title: Core.config.TITLE
  },
  sidebar: []
})

const isActivePath = (item: ISidebarItemState, route: IRouteState): boolean => {
  let isActive = route.path.search(item.to || '') !== -1 && (item.to !== '/')
  if ((route.path === '' || route.path === '/') && item.to === '/') {
    isActive = true
  }

  return isActive
}

export const mutations = {
  updateRoute: (state: IAppState, { route }: UpdateRoute) => {
    state.sidebar = state.sidebar.map((item: ISidebarItemState) => {
      return {
        ...item,
        isActive: isActivePath(item, route)
      }
    })
  },
  updatePageMeta: (state: IAppState, { data }: UpdatePageMeta) => {
    if (data.breadcrumb) {
      data.breadcrumb[data.breadcrumb.length - 1].isActive = true
    }
    state.page = {
      ...state.page,
      ...data
    }
  },
  updateDocMeta: (state: IAppState, { data }: UpdateDocMeta) => {
    if (data.title) {
      data.title = `${data.title} - ${Core.config.TITLE}`
    }
    state.doc = {
      ...state.doc,
      ...data
    }
  },
  setSidebar: (state: IAppState, { data }: SetSidebar) => {
    state.sidebar = data
  }
}

class UpdateRoute implements IAction {
  type = `${prefix}/updateRoute`

  constructor (public route: IRouteState) {}
}

class UpdatePageMeta implements IAction {
  type = `${prefix}/updatePageMeta`

  constructor (public data: IPageMeta) {}
}

class UpdateDocMeta implements IAction {
  type = `${prefix}/updateDocMeta`

  constructor (public data: IDocMeta) {}
}

class SetSidebar implements IAction {
  type = `${prefix}/setSidebar`

  constructor (public data: ISidebarItemState[]) {}
}

export const AppTypes = { UpdateRoute, UpdatePageMeta, UpdateDocMeta, SetSidebar }
