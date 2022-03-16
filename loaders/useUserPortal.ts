import {IPageFetchLoaderOptions, usePageLoader} from '~/hooks/loaderPage'
import {IUserPortalItem} from '~/models/userPortalModel'
import {portalUsersMockData} from '~/mocks/users/portalUsers'
import {useObjectLoader} from '~/hooks/loaderObject'
import {NewRequester} from '~/lib/Requester'
import {Core} from '~/core/Core'
import {useStore} from '@nuxtjs/composition-api'

export const useUserPortal = () => {
  const { state } = useStore()
  return usePageLoader<IUserPortalItem>({
    baseURL: Core.DefaultAPI('web/users'), mockItems: portalUsersMockData,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useUserPortalResetPassword = () => {
  const { state } = useStore()
  const loader = useObjectLoader<any>()
  const run = (id: string) => {
    loader.run(() => NewRequester.post(Core.DefaultAPI(`/web/users/${id}/reset-password`), {}, Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader,
    run
  }
}
