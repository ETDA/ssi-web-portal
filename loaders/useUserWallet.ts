import {IPageFetchLoaderOptions, usePageLoader} from '~/hooks/loaderPage'
import {walletUsersMockData} from '~/mocks/users/walletUsers'
import {useObjectLoader} from '~/hooks/loaderObject'
import {NewRequester} from '~/lib/Requester'
import {Core} from '~/core/Core'
import {IUserWalletGroupItem, IUserWalletItem} from '~/models/userWalletModel'
import {useStore} from '@nuxtjs/composition-api'

export const useUserWallet = () => {
  const { state } = useStore()
  return usePageLoader<IUserWalletItem>({
    baseURL: Core.DefaultAPI('/web/mobile/users'),
    getFetchOptions: () => Core.DefaultAPIOptions(state),
    getFetchBaseURL: (opts: IPageFetchLoaderOptions) => opts.groupId ? Core.DefaultAPI(`/web/mobile/groups/${opts.groupId}/users`) : Core.DefaultAPI('/web/mobile/users'),
    mockItems: walletUsersMockData
  })
}

export const useUserWalletMultiDelete = () => {
  const { state } = useStore()
  const loader = useObjectLoader<any>()
  const run = (groupId: string, userIds: string[]) => {
    loader.run(() => NewRequester.post(Core.DefaultAPI(`/web/mobile/groups/${groupId}/users/remove`), {
      user_ids: userIds
    }, Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader, run
  }
}

export const useUserWalletGroup = () => {
  const { state } = useStore()
  return usePageLoader<IUserWalletGroupItem>({
    baseURL: Core.DefaultAPI('/web/mobile/groups'),
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useUserWalletMultiSetGroup = () => {
  const { state } = useStore()
  const loader = useObjectLoader<any>()
  const run = (userIds: string[], groupsIds: string[]) => {
    loader.run(() => NewRequester.post(Core.DefaultAPI(`/web/mobile/groups/users`), {
      user_ids: userIds,
      group_ids: groupsIds
    }, Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader, run
  }
}

