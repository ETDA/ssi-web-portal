import { Core } from '~/core/Core'
import { useStore } from '@nuxtjs/composition-api'
import { IPageFetchLoaderOptions, usePageLoader } from '~/hooks/loaderPage'
import { IVPRequestItem } from '~/models/vpModel'

export const useVPRequest = () => {
  const { state } = useStore()
  return usePageLoader<IVPRequestItem>({
    baseURL: Core.DefaultAPI('/web/requested-vps'),
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}
