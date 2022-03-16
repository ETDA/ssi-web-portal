import FormSchemaCreateHelper from './FormSchemaCreateHelper'
import { ISchemaForm } from './types'

describe('FormSchemaCreateHelper', () => {
  test('transform', () => {
    const form: ISchemaForm = {
      'schema_name': 'schema name',
      'schema_type': 'schema type',
      'schema_body': {
        'first_name': {
          'name': 'first_name',
          'type': 'string',
          'required': true,
          'alias': 'first_name'
        },
        'last_name': {
          'name': 'last_name',
          'type': 'string',
          'required': true,
          'alias': 'last_name'
        },
        'address': {
          'name': 'address',
          'type': 'object',
          'required': true,
          'alias': 'address',
          'properties': {
            'province': {
              'name': 'province',
              'type': 'string',
              'required': true,
              'alias': 'province'
            },
            'zipcode': {
              'name': 'zipcode',
              'type': 'string',
              'required': true,
              'alias': 'zipcode'
            }
          }
        }
      }
    }
    const payload = FormSchemaCreateHelper.transform(form)

    // Test with your eye.
    console.log(JSON.stringify(payload))
  })
})

