import {page} from '~/lib/state/page'
import {IActionOptions, IStateContext} from '~/lib/state/types'
import {Core} from '~/core/Core'

export interface IUserItem {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_verified_email: boolean;
  date_joined: string;
  updated_at: string;
  is_active: boolean
}

const prefix = 'user/users'
export const usersStateMeta = page.getStateMeta(prefix)
export const state = () => page.state()
export const mutations = page.mutations()
export const actions = {
  ...page.actions((ctx: IStateContext, data: any): IActionOptions => {
    return {
      baseURL: Core.DefaultAPI('v1/users/')
    }
  })
}

export const getters = page.getters()
