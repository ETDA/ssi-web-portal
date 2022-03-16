import {BaseRepository} from '~/repositories/BaseRepository'
import {IBreadcrumbItemState, IDocMeta, IPageMeta, IRouteState, ISidebarItemState} from '~/store/types'
import * as queryString from 'query-string'
import {menu} from '~/constants/menu'
import {AppTypes} from '~/store/app'
import {Core} from '~/core/Core'

export default class AppRepository extends BaseRepository {
  public get config () {
    return Core.config
  }

  public get query (): any {
    if (process.browser) {
      return queryString.parse(window.location.search)
    } else {
      return this.state.route.query
    }
  }

  public get pageMeta (): IPageMeta {
    return this.state.app.page
  }

  public get docMeta (): IDocMeta {
    return this.state.app.doc
  }

  public get sidebar (): ISidebarItemState[] {
    return this.state.app.sidebar
  }

  public get route (): IRouteState {
    return this.state.route
  }

  public get breadcrumb (): IBreadcrumbItemState[] {
    return this.state.app.page.breadcrumb!
  }

  public get menu () {
    return menu()
  }

  public static menu () {
    return menu()
  }

  public updateRoute = (route: any): void => {
    this.commit(new AppTypes.UpdateRoute(route))
  }

  public updatePageMeta = (data: IPageMeta): void => {
    this.commit(new AppTypes.UpdatePageMeta(data))
  }

  public updateDocMeta = (data: IDocMeta): void => {
    this.commit(new AppTypes.UpdateDocMeta(data))
  }
}
