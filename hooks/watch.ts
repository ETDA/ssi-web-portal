import {watch} from '@nuxtjs/composition-api'
import {isChangeWithFalse, isChangeWithTrue} from '~/lib/state/util'

export const useWatchTrue = (source: () => boolean, cb: (v: boolean, o: boolean) => any) => {
  watch(source, (value: any, oldVal: any) => {
    if (isChangeWithTrue(value, oldVal)) {
      cb(value, oldVal)
    }
  })
}


export const useWatchFalse = (source: () => boolean, cb: (v: boolean, o: boolean) => any) => {
  watch(source, (value: any, oldVal: any) => {
    if (isChangeWithFalse(value, oldVal)) {
      cb(value, oldVal)
    }
  })
}
