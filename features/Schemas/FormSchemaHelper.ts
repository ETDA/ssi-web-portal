import { ISchemaItem } from '~/store/schemas/schema'
import { ISchemaForm } from '~/features/SchemaCreate/types'
import { _get, _set } from '~/utils/lodash'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { NewRequester } from '~/lib/Requester'

const getBaseURL = (url: string) => {
  const split = url.split('/')
  split.pop()
  return ArrayHelper.toArray(split).join('/')
}
const sortObj = (obj) => {
  return Object.keys(obj).sort((a, b) => {
    return obj[a].order - obj[b].order
  }).reduce((r, k) => (r[k] = obj[k], r), {})
}

export default class FormSchemaHelper {
  static initOverview = async (item: ISchemaItem | any): Promise<ISchemaForm> => {
    const form: ISchemaForm = {
      schema_name: item.schema_name,
      schema_type: item.schema_type,
      schema_body: {}
    }

    const recursiveTransform = async (properties: object, required: string[] = [], context?: any): Promise<any> => {
      const obj: object = {}

      for (const [k, v] of Object.entries<any>(properties || {})) {
        if (v.type === 'string' || v.type === 'number') {
          if (ArrayHelper.isExist(required, k)) {
            _set(obj, `${k}.required`, true)
          }
          _set(obj, k, {
            ..._get(obj, k, {}),
            name: k,
            alias: v.alias || k,
            type: v.type,
            isDate: v.is_date || false,
            order: v.order,
            description: v.description || ''
          })
        } else if (v.type === 'array') {
          if (ArrayHelper.isExist(required, k)) {
            _set(obj, `${k}.required`, true)
          }

          if (v.items.$ref) {
            let data: any = context || item
            let url = `${getBaseURL(item.schema_body.id || item.schema_body.$id)}/${v.items.$ref}`
            if (v.items.$ref.startsWith('#')) {
              url = `${context.id || context.$id}${v.items.$ref}`
            }
            const { data: dataTemp } = await NewRequester.get(url)
            data = dataTemp
            let refData = data
            const refs = v.items.$ref.split('#')
            if (refs.length > 1 && refs[1] && refs[1] !== '/') {
              refData = _get(data, refs[1].replaceAll('/', '.').substring(1), {})
            }
            const propertiesFromRef = refData.properties
            if (refData.allOf) {
              for (const item1 of ArrayHelper.toArray(refData.allOf)) {
                item1.type = item1.type || 'object'
                _set(obj, k, {
                  name: k,
                  alias: v.alias || k,
                  type: `list_of_${item1.type}`,
                  description: item1.description || '',
                  isGroup: false,
                  order: v.order,
                  properties: await recursiveTransform(item1.properties || {}, item1.required, refs.length > 1 ? context : null)
                })
              }
            } else {
              refData.type = refData.type || 'object'
              _set(obj, k, {
                ..._get(obj, k, {}),
                name: k,
                alias: v.alias || k,
                type: `list_of_${refData.type}`,
                description: refData.description || '',
                isGroup: false,
                order: v.order,
                properties: await recursiveTransform(propertiesFromRef || {}, refData.required, refs.length > 1 ? data : null)
              })
            }

          } else {
            _set(obj, k, {
              ..._get(obj, k, {}),
              name: k,
              alias: v.alias || k,
              type: `list_of_${v.items.type}`,
              description: v.description || '',
              isGroup: v.is_group,
              order: v.order,
              properties: await recursiveTransform(v.items.properties || {}, v.items.required)
            })
          }
        } else if (v.type === 'object') {
          _set(obj, k, {
            name: k,
            alias: v.alias || k,
            type: v.type,
            description: v.description || '',
            isGroup: v.is_group,
            order: v.order,
            properties: await recursiveTransform(v.properties || {}, v.required)
          })
        } else if (v.$ref) {
          const refs = v.$ref.split('#')
          if (!context && refs.length > 1 && refs[1] && refs[1] !== '/') {
            try {
              let url = `${getBaseURL(item.schema_body.id || item.schema_body.$id)}/${v.$ref}`
              if (v.$ref.startsWith('#')) {
                url = `${item.schema_body.id || item.schema_body.$id}${v.$ref}`
              }
              const { data } = await NewRequester.get<any>(url)
              let refData = data
              const refs = v.$ref ? v.$ref.split('#') : v.items.$ref.split('#')
              if (refs.length > 1 && refs[1] && refs[1] !== '/') {
                refData = _get(data, refs[1].replaceAll('/', '.').substring(1), {})
              }
              const propertiesFromRef = refData.properties
              if (refData.allOf) {
                for (const item1 of ArrayHelper.toArray(refData.allOf)) {
                  item1.type = item1.type || 'object'
                  _set(obj, k, {
                    name: k,
                    alias: v.alias || k,
                    type: `list_of_${item1.type}`,
                    description: item1.description || '',
                    isGroup: false,
                    order: v.order,
                    properties: await recursiveTransform(item1.properties || {}, item1.required, refs.length > 1 ? context : null)
                  })
                }
              } else {
                _set(obj, k, {
                  ..._get(obj, k, {}),
                  name: k,
                  alias: v.alias || k,
                  type: refData.type,
                  description: refData.description || '',
                  isGroup: false,
                  order: v.order,
                  properties: await recursiveTransform(propertiesFromRef || {}, refData.required, data)
                })
              }
            } catch (e) {
              console.log(e)
            }

          } else {
            const refData = _get(context || item, refs[1].replaceAll('/', '.').substring(1), {})
            if (refData.allOf) {
              for (const item1 of ArrayHelper.toArray(refData.allOf)) {
                _set(obj, k, {
                  name: k,
                  alias: v.alias || k,
                  type: item1.type,
                  description: item1.description || '',
                  isGroup: false,
                  order: v.order,
                  properties: await recursiveTransform(item1.properties || {}, item1.required, context)
                })
              }
            }
          }
        }
      }

      return sortObj(obj)
    }

    form.schema_body = await recursiveTransform(sortObj(item.schema_body.properties), ArrayHelper.toArray(item.schema_body.required))
    return form
  }
}
