import {CONFIG} from '~/constants/config'
import {IStateContext} from '~/lib/state/types'
import urlJoin from 'url-join'
import {menu} from '~/constants/menu'

export class Core {
  static get config () {
    return CONFIG
  }

  static get menu () {
    return menu()
  }

  static DefaultAPIOptions = (ctx: IStateContext | any): any => {
    let token = false
    if (ctx.rootState) {
      token = ctx.rootState?.user?.me?.data?.token || false
    } else {
      token = ctx.user?.me?.data?.token || false
    }
    return {
      baseURL: Core.config.BASE_API,
      headers: {
        ...(token ? { Authorization: `${Core.config.BASE_API_PREFIX_TOKEN} ${token}` } : {})
      }
    }
  }
  static DefaultAPI = (path: string): string => {
    return urlJoin(`${Core.config.BASE_API}`, path)
  }
}
