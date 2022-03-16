import {ref} from '@vue/composition-api'
import {IStatus} from '~/lib/state/types'
import {ObjectHelper} from '~/utils/ObjectHelper'

export const useItemsLoader = <T> () => {
  const status = ref<IStatus>(ObjectHelper.createStatus())
  const items = ref<T[]>([])
  const options = ref<{ [key: string]: any }>({})
  const clear = () => {
    status.value = ObjectHelper.createStatus()
    options.value = {}
    items.value = []
  }

  const run = async (action: () => Promise<any>) => {
    status.value = ObjectHelper.toLoadingStatus(status.value)
    try {
      const {
        items: itemss,
        ...options
      } = (await action()).data
      items.value = itemss
      options.value = options
      status.value = ObjectHelper.toSuccessStatus(status.value)
    } catch (e) {
      status.value = ObjectHelper.toErrorStatus(status.value, e.response.data)
    }

    status.value = ObjectHelper.toCompleteStatus(status.value)
  }

  return {
    items,
    options,
    status,
    run,
    clear
  }
}
