import {_get} from '~/utils/lodash'
import {IError} from '~/lib/state/types'

export class ParamHelper {
  static getBoolTrue = (bool: any): boolean => {
    if (bool === 'false') {
      return false
    }

    if (bool === 'true') {
      return true
    }

    return bool === null ? true : !!bool
  }

  static getBoolFalse = (bool: any): boolean => {
    if (bool === 'false') {
      return false
    }

    if (bool === 'true') {
      return true
    }

    return bool === null ? false : !!bool
  }

  static isNotFoundError = (error: IError | any): boolean => {
    return _get(error, `code`, true) === 'NOT_FOUND'
  }

}
