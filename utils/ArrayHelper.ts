import {IOption} from '~/components/Form/types'
import {_get} from '~/utils/lodash'

export class ArrayHelper {
  static toOptions(data: any[], valueAttr: string = 'id', labelAttr: string = 'name'): IOption[] {
    return ArrayHelper.toArray(data).map((item: any) => {
      const value = _get(item, valueAttr, null)
      return {
        value: value || null,
        label: _get(item, labelAttr, value)
      }
    })
  }

  static toArray<T>(value: any): (T | any)[] {
    return Array.from(value || [])
  }

  static isEmpty(value: any): boolean {
    return this.toArray(value).length === 0
  }

  static isExist(data: any[], value: any): boolean {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === value) {
        return true
      }
    }

    return false
  }

  static getKeyFromArray = (array: any[], key: string): string[] => {
    let keys: string[] = []

    for (let i = 0; i < array.length; i++) {
      keys = [
        ...keys,
        ...([_get(array[i], key, null)] || [])
      ]
    }

    return keys
  }
}
