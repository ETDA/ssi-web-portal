import { ISchemaBodyItem, ISchemaForm, ISchemaFormProperties } from '~/features/SchemaCreate/types'
import { _get, _set } from '~/utils/lodash'

export default class FormSchemaCreateHelper {
  static transform = (data: ISchemaForm) => {
    let order = 0

    const recursiveTransform = (properties: ISchemaFormProperties): any => {
      let required: string[] = []
      let obj: any = {}

      for (const [_, v] of Object.entries<ISchemaBodyItem>(properties)) {
        order++

        if (v.type === 'string' || v.type === 'number' || v.type === 'date') {
          if (v.required) {
            required = [
              ...required,
              v.name
            ]
          }
          _set(obj, v.name, {
            ..._get(obj, v.name, {}),
            alias: v.alias,
            type: v.type,
            is_date: v.isDate,
            description: v.description || '',
            order
          })
        } else if (v.type === 'object') {
          _set(obj, `${v.name}`, {
            alias: v.alias,
            type: v.type,
            description: v.description || '',
            is_group: v.isGroup,
            order,
            ...recursiveTransform(v.properties || {})
          })
        } else if (v.type === 'list_of_object') {
          _set(obj, `${v.name}`, {
            alias: v.alias,
            type: 'array',
            description: v.description || '',
            minItems: v.required ? 1 : 0,
            items: {
              type: 'object',
              ...recursiveTransform(v.properties || {})
            },
            is_group: v.isGroup,
            order
          })
        } else if (v.type === 'list_of_string') {
          _set(obj, `${v.name}`, {
            alias: v.alias,
            type: 'array',
            description: v.description || '',
            minItems: v.required ? 1 : 0,
            items: {
              type: 'string'
            },
            order
          })
        } else {
          _set(obj, `${v.name}`, {
            alias: v.alias,
            type: v.type || 'object',
            description: v.description || '',
            is_group: v.isGroup,
            order,
            ...recursiveTransform(v.properties || {})
          })
        }
      }

      return {
        properties: obj,
        required
      }
    }

    let payload: any = {}

    payload['schema_name'] = data.schema_name
    payload['schema_type'] = data.schema_type
    payload['schema_body'] = {
      '$schema': 'https://json-schema.org/draft/2020-12/schema#',
      type: 'object',
      title: data.schema_name,
      ...recursiveTransform(data.schema_body)
    }

    return payload
  }
}
