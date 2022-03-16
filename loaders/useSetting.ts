import {useObjectLoader} from '~/hooks/loaderObject'
import {NewRequester} from '~/lib/Requester'
import {Core} from '~/core/Core'
import {useStore} from '@nuxtjs/composition-api'
import {ISettingWalletItem} from '~/models/setttingModel'

export const useSettingMobileWallet = () => {
  const { state } = useStore()
  const loader = useObjectLoader<ISettingWalletItem>()
  const run = (data: any) => {
    loader.run(() => NewRequester.post(Core.DefaultAPI(`web/configs/wallets`), data, Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader, run
  }
}
export const useSettingMobileWalletGet = () => {
  const { state } = useStore()
  const loader = useObjectLoader<ISettingWalletItem>()
  const run = () => {
    loader.run(() => NewRequester.get(Core.DefaultAPI(`web/configs/wallets`), Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader,
    run
  }
}
export const useSettingMobileWalletDelete = () => {
  const { state } = useStore()
  const loader = useObjectLoader<null>()
  const run = (id: string) => {
    loader.run(() => NewRequester.delete(Core.DefaultAPI(`web/configs/wallets/${id}`), Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader,
    run
  }
}
