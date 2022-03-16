import {IActionOptions, IStateContext} from '~/lib/state/types'
import {Core} from '~/core/Core'
import {page} from "~/lib/state/page";
import {schemaMockData, schemaMockItems} from "~/mocks/shemas/schema";

const prefix = 'schemas/schema'

export interface ISchemaItemFormSchemaBody {
  title_th: string
  title_en: string
  type: string
  format: string
  required: boolean
}

export interface ISchemaItemForm {
  id: string
  schema_name: string
  schema_type: string
  schema_endpoint?: string
  permission?: string
  version: string
  schema_body: ISchemaItemFormSchemaBody[]
  is_active: boolean
  created_at: string
  created_by: string
}

export interface ISchemaItem {
  id: string
  schema_name: string
  schema_type: string
  version?: string
  schema_body: {
    $id: string
    $schema: string
    title?: string
    description?: string
    type?: string
    properties: {
      [key: string]: {
        description?: string
        type: string
        items?: {
          type: string
        }
        minItems?: number
        [key: string]: any
      },
    },
    required: string[],
    additionalProperties?: boolean
  }
  created_at?: string
}

export const state = () => page.state()
export const mutations = page.mutations()
export const actions = {
  ...page.actions((ctx: IStateContext, data: any): IActionOptions => {
    return {
      baseURL: Core.DefaultAPI('web/schema'),
      baseFindURL: Core.DefaultAPI(`web/schema/${data?.id}`),
      baseUpdateURL: Core.DefaultAPI(`web/schema/${data?.id}`),
      baseDeleteURL: Core.DefaultAPI(`web/schema/${data?.id}`),

      options: {
        ...(data?.options || {}),
        mockData: schemaMockData,
        mockItems: schemaMockItems,
      },
    }
  }),
}

export const getters = page.getters()
export const schemaStateMeta = page.getStateMeta(prefix)

