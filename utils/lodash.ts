import get from 'lodash/get'
import set from 'lodash/set'
import findIndex from 'lodash/findIndex'
import dropRight from 'lodash/dropRight'
import intersection from 'lodash/intersection'
import {
  debounce,
  difference,
  flattenDeep,
  isArray,
  isEmpty,
  isEqual,
  isObject,
  isUndefined,
  map,
  shuffle,
  size,
  sortBy,
  uniq,
  uniqBy,
  toPairs,
  orderBy,
  fromPairs,
} from 'lodash'

export const _get = (object: any, path: string, def: any): any => {
  return get(object, path, def)
}

export const _isUndefined = (value: any): boolean => {
  return isUndefined(value)
}

export const _dropRight = (value: any[], count = 1): any[] => {
  return dropRight(value, count)
}

export const _intersection = (value: any[], value2: any[]): any[] => {
  return intersection(value, value2)
}

export const _set = (object: any, path: string, def: any): any => {
  return set(object, path, def)
}

export const _map = (object: any, funn: Function): any[] => {
  return map(object, funn)
}

export const _flatDeep = (object: any[]): any[] => {
  return flattenDeep(object)
}

export const _uniq = (object: any[]): any[] => {
  return uniq(object)
}

export const _sortBy = (object: any[], func: Function): any[] => {
  return sortBy(object, func)
}

export const _uniqBy = (object: any[], func: Function): any[] => {
  return uniqBy(object, func)
}

export const _clone = (object: any): any => {
  try {
    return JSON.parse(JSON.stringify(object || {}))
  } catch (e) {
    return {}
  }
}

export const _isEmpty = (object: any): boolean => {
  return isEmpty(object)
}

export const _isObject = (object: any): boolean => {
  return isObject(object)
}
export const _isArray = (arr: any): boolean => {
  return isArray(arr)
}

export const _debounce = <T extends (...args: any[]) => any>(func: T, wait: number = 150) => {
  return debounce(func, wait)
}

export const _findIndex = (array: any, fn: (item: any) => boolean): number => {
  return findIndex(array, fn)
}
export const _isEqual = (value: any, other: any): boolean => {
  return isEqual(value, other)
}

export const _difference = (value: any[], other: any[]): any[] => {
  return difference(value, other)
}
export const _shuffle = (value: any[]): any[] => {
  return shuffle(value)
}
export const _size = (obj: any): number => {
  return size(obj)
}

export const _toPairs = (obj: any) => {
  return toPairs(obj)
}

export const _orderBy = (obj: any, keys: string[], orders: string[]) => {
  return orderBy(obj, keys, orders)
}

export const _fromPairs = (arr: any[]) => {
  return fromPairs(arr)
}
