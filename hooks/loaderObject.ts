import {IStatus} from '~/lib/state/types'
import {ref} from '@vue/composition-api'
import {ObjectHelper} from '~/utils/ObjectHelper'
import {IUseObjectLoader} from "~/hooks/loaderPage";

export const useObjectLoader = <T>(): IUseObjectLoader<T> => {
  const status = ref<IStatus>(ObjectHelper.createStatus())
  const data = ref<T | null>(null)
  const clear = () => {
    status.value = ObjectHelper.createStatus()
    data.value = null
  }
  const run = async (action: () => Promise<any>) => {
    status.value = ObjectHelper.toLoadingStatus(status.value)
    try {
      data.value = (await action()).data
      status.value = ObjectHelper.toSuccessStatus(status.value)
    } catch (e) {
      status.value = ObjectHelper.toErrorStatus(status.value, e.response.data)
    }

    status.value = ObjectHelper.toCompleteStatus(status.value)
  }

  const setLoading = () => {
    status.value = ObjectHelper.toLoadingStatus(status.value)
  }

  return {
    data,
    status,
    run,
    clear,
    setLoading,
  }
}
