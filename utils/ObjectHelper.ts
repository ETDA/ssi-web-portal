import {_get, _isEmpty, _set} from '~/utils/lodash'
import {ParamHelper} from '~/utils/ParamHelper'
import {IStatus} from '~/lib/state/types'

export interface IOption {
  label: string
  value: any
}

export class ObjectHelper {
  static createOption(value: any, label: string = ''): IOption {
    return {
      value: value,
      label: label
    }
  }

  static toOption(data: any, valueAttr: string = 'id', labelAttr: string = 'name'): IOption {
    data = data || {}
    const value = _get(data, valueAttr, '')
    return {
      value: value,
      label: _get(data, labelAttr, value)
    }
  }

  static toOptions(data: any, valueAttr: string = 'id', labelAttr: string = 'name'): IOption[] {
    if (!data) {
      return []
    }
    const value = _get(data, valueAttr, '')
    return [
      {
        value: value,
        label: _get(data, labelAttr, value)
      }]
  }

  static toStatus(obj: any): IStatus {
    return {
      isLoaded: ParamHelper.getBoolFalse(obj.isLoaded),
      isLoading: ParamHelper.getBoolFalse(obj.isLoading),
      isError: ParamHelper.getBoolFalse(obj.isError),
      isSuccess: ParamHelper.getBoolFalse(obj.isSuccess),
      errorData: obj.errorData || null
    }
  }

  static toLoadingStatus(obj: any): any {
    return {
      ...obj,
      isLoaded: false,
      isError: false,
      isLoading: true,
      isSuccess: false
    }
  }

  static toItemsSuccessStatus(obj: any, items: any[]): any {
    return {
      ...obj,
      isSuccess: true,
      errorData: null,
      items: items
    }
  }

  static toObjectSuccessStatus(obj: any, data: any = null): any {
    return {
      ...obj,
      isSuccess: true,
      errorData: null,
      data: data
    }
  }

  static toErrorStatus(obj: any, error: any): any {
    return {
      ...obj,
      isError: true,
      isSuccess: false,
      errorData: error
    }
  }

  static toSuccessStatus(obj: any): any {
    return {
      ...obj,
      isSuccess: true,
      errorData: null
    }
  }

  static toCompleteStatus(obj: any): any {
    return {
      ...obj,
      isLoading: false,
      isLoaded: true
    }
  }

  static createStatus(): IStatus {
    return {
      isLoaded: false,
      isLoading: false,
      isError: false,
      isSuccess: false,
      errorData: null
    }
  }

  static isInvalidParams(errorData: any): boolean {
    return errorData.code === 'INVALID_PARAMS'
  }

  static depth = (obj: any) => {
    let c = 0

    const f = (o) => {
      for (const [_, v] of Object.entries(o || {})) {
        c++
        typeof v === 'object' && f(v)
      }
    }
    f(obj)

    return c
  }

  static depthWithSpecificKey = (obj: any, key: string): number => {
    let c = 0

    const f = (o) => {
      for (const [k, v] of Object.entries(o || {})) {
        if (k === key) {
          c++
        }
        typeof v === 'object' && f(v)
      }
    }
    f(obj)

    return c
  }

  static isEmpty = (object: any): boolean => {
    return _isEmpty(object)
  }

  static setDeepestValue = (obj: any, key: string, validate: string, linkKey: string, target: string, value: any) => {
    let recursive = (o: any) => {
      if (!!o[key] && !!o[target]) {
        if (_get(o, key, 'a') == _get(o, validate, 'b')) {
          _set(o, target, value)
          return
        }
      }

      if (_get(o, linkKey, null) !== null && typeof _get(o, linkKey, null) === 'object') {
        recursive(_get(o, linkKey, {}))
      }
    }

    recursive(obj)
  }
}
