import { v4 as uuidv4 } from 'uuid'
import { ISchemaBodyItem, ISchemaFormProperties } from '~/features/SchemaCreate/types'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { _clone, _get, _set } from '~/utils/lodash'

export interface IFormMeta {
  type: string
  endpoint: string
  schema: string
  schemaName?: string
  version: string
  schemaBodyID: string
}

export interface IFormOwnerShip {
  signer: {
    name: string
    did: string
    email: string
    [key: string]: any
  }
  holder: {
    name: string
    did: string
    email: string
    [key: string]: any
  }
}

export interface IFormDetail {
  [key: string]: {
    label?: string
    name?: string
    required?: boolean
    is_group?: boolean
    is_date?: boolean
    type: string
    order: number
    value?: string | string[] | IFormDetail | IFormDetail[]
  }
}

export interface IForm {
  meta?: IFormMeta
  ownership?: IFormOwnerShip
  properties?: IFormDetail
}

export default class FormDocumentCreateHelper {
  static initMeta = (item?: IFormMeta): IFormMeta => {
    if (item) {
      return {
        type: item.type,
        endpoint: item.endpoint,
        schema: item.schema,
        schemaName: item.schemaName,
        schemaBodyID: item.schemaBodyID,
        version: item.version
      }
    } else {
      return {
        type: '',
        endpoint: '',
        schema: '',
        schemaName: '',
        schemaBodyID: '',
        version: ''
      }
    }
  }

  static initOwnerShip = (item?: IFormOwnerShip): IFormOwnerShip => {
    if (item) {
      return {
        signer: {
          name: item.signer.name,
          did: item.signer.did,
          email: item.signer.email
        },
        holder: {
          name: item.holder.name,
          did: item.holder.did,
          email: item.holder.email
        }
      }
    } else {
      return {
        signer: {
          name: '',
          did: '',
          email: ''
        },
        holder: {
          name: '',
          did: '',
          email: ''
        }
      }
    }
  }

  static initDetail = (schemaBody: any): IFormDetail => {
    let recursiveTransform = (properties: any, required: string[]) => {
      let haveToRecursive = (type: string): boolean => {
        if (type === 'string') {
          return false
        } else if (type === 'number') {
          return false
        }

        return true
      }
      let recursiveTransform = (prop: any, required: string[]): any => {
        let obj: any = {}

        let tmp: any | null = null
        let uuid = uuidv4()
        for (const [k, v] of Object.entries<any>(prop)) {
          if (v.type === 'string' || v.type === 'number') {
            if (tmp === null) {
              tmp = {
                [uuid]: {
                  type: v.type,
                  value: {
                    [k]: {
                      label: v.alias,
                      name: k,
                      isDate: v.is_date,
                      required: ArrayHelper.isExist(required, k),
                      type: v.type
                    }
                  }
                }
              }
            } else {
              tmp = {
                ...tmp,
                [uuid]: {
                  ...(tmp[uuid] || {}),
                  value: {
                    ...(tmp[uuid]['value'] || {}),
                    [k]: {
                      label: v.alias,
                      name: k,
                      isDate: v.is_date,
                      required: ArrayHelper.isExist(required, k),
                      type: v.type
                    }
                  }
                }
              }
            }
          } else if (v.type === 'array') {
            if (tmp !== null) {
              obj = {
                ...obj,
                ...tmp
              }

              tmp = null
              uuid = uuidv4()
            }

            obj = {
              ...obj,
              [k]: {
                label: v.alias,
                name: k,
                isGroup: v.is_group,
                required: v.minItems === 1,
                type: `list_of_${v.items.type}`,
                value: v.items.type === 'object' ? [recursiveTransform(v.items.properties || {}, v.items?.required || [])] : ['']
              }
            }
          } else if ('object') {
            if (tmp !== null) {
              obj = {
                ...obj,
                ...tmp
              }

              tmp = null
              uuid = uuidv4()
            }

            obj = {
              ...obj,
              [k]: {
                label: v.alias,
                name: k,
                isGroup: v.is_group,
                required: ArrayHelper.isExist(required, k),
                type: v.type,
                ...(haveToRecursive(v.type) ? { value: recursiveTransform(v.properties || {}, v.required || []) } : {})
              }
            }
          }
        }

        if (tmp !== null) {
          obj = {
            ...obj,
            ...tmp
          }
        }

        return obj
      }

      return recursiveTransform(properties, required)
    }

    return recursiveTransform(schemaBody.properties, schemaBody.required)
  }

  static transformSchemaProperties = (props: ISchemaFormProperties): IFormDetail => {
    let haveToRecursive = (type: string): boolean => {
      if (type === 'string') {
        return false
      } else if (type === 'number') {
        return false
      }

      return true
    }
    let recursiveTransform = (prop: ISchemaFormProperties): any => {
      let obj: any = {}

      let tmp: any | null = null
      let uuid = uuidv4()
      for (const [k, v] of Object.entries<ISchemaBodyItem>(prop)) {
        if (v.type === 'string' || v.type === 'number') {
          if (tmp === null) {
            tmp = {
              [uuid]: {
                type: 'string',
                value: {
                  [k]: {
                    label: v.alias,
                    name: k,
                    required: v.required || false,
                    type: v.type,
                    isDate: v.isDate,
                    order : v.order,
                    value: v.value
                  }
                }
              }
            }
          } else {
            tmp = {
              ...tmp,
              [uuid]: {
                ...(tmp[uuid] || {}),
                value: {
                  ...(tmp[uuid]['value'] || {}),
                  [k]: {
                    label: v.alias,
                    name: k,
                    required: v.required || false,
                    type: v.type,
                    isDate: v.isDate,
                    order : v.order,
                    value: v.value
                  }
                }
              }
            }
          }
        } else if (v.type === 'list_of_string') {
          if (tmp !== null) {
            obj = {
              ...obj,
              ...tmp
            }

            tmp = null
            uuid = uuidv4()
          }

          obj = {
            ...obj,
            [k]: {
              label: v.alias,
              name: k,
              required: v.required || false,
              isGroup: v.isGroup,
              type: v.type,
              order : v.order,
              value: ['']
            }
          }
        } else if (v.type === 'list_of_object') {
          if (tmp !== null) {
            obj = {
              ...obj,
              ...tmp
            }

            tmp = null
            uuid = uuidv4()
          }

          obj = {
            ...obj,
            [k]: {
              label: v.alias,
              name: k,
              required: v.required || false,
              isGroup: v.isGroup,
              type: v.type,
              order : v.order,
              value: haveToRecursive(v.type) ? [{ ...recursiveTransform(v.properties || {}) }] : v.value
            }
          }
        } else {
          if (tmp !== null) {
            obj = {
              ...obj,
              ...tmp
            }

            tmp = null
            uuid = uuidv4()
          }

          obj = {
            ...obj,
            [k]: {
              label: v.alias,
              name: k,
              required: v.required || false,
              isGroup: v.isGroup,
              type: v.type,
              order : v.order,
              value: haveToRecursive(v.type) ? { ...recursiveTransform(v.properties || {}) } : v.value
            }
          }
        }
      }

      if (tmp !== null) {
        obj = {
          ...obj,
          ...tmp
        }
      }

      return obj
    }

    return recursiveTransform(props)
  }

  static transformVCCredentialSubject = (props: IFormDetail): any => {
    let credentialSubject: any = {}

    for (const [_, v] of Object.entries<any>(props)) {
      if ((v.type === 'string' || v.type === 'number') && !!v.name) {
        _set(credentialSubject, v.name, v.value)
      } else if (v.type === 'string' || v.type === 'number') {
        for (const [_, s] of Object.entries<any>(v.value || {})) {
          _set(credentialSubject, s.name, s.value)
        }
      } else if (v.type === 'list_of_string') {
        _set(credentialSubject, v.name, v.value)
      } else if (v.type === 'list_of_object') {
        let list: any[] = []

        for (let i = 0; i < v.value.length; i++) {
          list = [
            ...list,
            FormDocumentCreateHelper.transformVCCredentialSubject(v.value[i] || {})
          ]
        }
        _set(credentialSubject, v.name, list)
      } else if (v.type === 'object') {
        _set(credentialSubject, v.name, {
          ...FormDocumentCreateHelper.transformVCCredentialSubject(v.value || {})
        })
      }
    }

    return credentialSubject
  }

  static transformVC = (form: IForm): any => {
    return {
      schema_name: form.meta?.schemaName,
      ...(!!form.ownership?.signer && {
        signer: form.ownership?.signer.did
      }),
      ...(!!form.ownership?.holder && {
        holder: form.ownership?.holder.did
      }),
      credentialSubject: form.properties,
      credentialSchema: {
        id: form.meta?.schemaBodyID,
        type: form.meta?.type || 'all'
      }
    }
  }

  static bindVCToSchema = (schema: IFormDetail, vc: any): any => {
    let data = _clone(schema)
    let recursiveTransform = (properties: IFormDetail, vc: any, schemaPrefix: string, prefixVC: string) => {
      for (const [k, v] of Object.entries<any>(properties)) {
        if ((v.type === 'string' || v.type === 'number') && !!v.name) {
          _set(data, `${schemaPrefix ? `${schemaPrefix}.` : ''}${k}.value`, _get(vc, `${prefixVC ? `${prefixVC}.` : ''}${k}`, ''))
        } else if (v.type === 'string' || v.type === 'number') {
          recursiveTransform(v.value, vc, `${schemaPrefix ? `${schemaPrefix}.` : ''}${k}.value`, prefixVC)
        } else if (v.type === 'list_of_string') {
          _set(data, `${schemaPrefix ? `${schemaPrefix}.` : ''}${k}.value`, _get(vc, `${prefixVC ? `${prefixVC}.` : ''}${k}`, ['-']))
        } else if (v.type === 'list_of_object') {
          const length = ArrayHelper.toArray(_get(vc, `${prefixVC ? `${prefixVC}.` : ''}${k}`, [])).length
          v.value = [
            _get(v.value, '[0]', {})
          ]

          for (let i = 0; i < length - 1; i++) {
            v.value = [
              ...v.value,
              _clone(_get(v.value, '[0]', {}))
            ]
          }

          for (let i = 0; i < length; i++) {
            recursiveTransform(v.value[i], vc, `${schemaPrefix ? `${schemaPrefix}.` : ''}${k}.value[${i}]`, `${prefixVC ? `${prefixVC}.` : ''}${k}[${i}]`)
          }
        } else if (v.type === 'object') {
          recursiveTransform(v.value, vc, `${schemaPrefix ? `${schemaPrefix}.` : ''}${k}.value`, `${prefixVC ? `${prefixVC}.` : ''}${k}`)
        }
      }
    }
    recursiveTransform(data, vc, '', '')

    return data
  }
}
