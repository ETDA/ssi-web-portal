export interface ISchemaBodyItem {
  alias: string
  name: string
  type: string
  description?: string
  required: boolean
  isGroup?: boolean,
  isDate?: boolean,
  order?: number,
  items?: object,
  properties?: ISchemaFormProperties
  value?: any,
}

export interface ISchemaFormProperties {
  [key: string]: ISchemaBodyItem
}

export interface ISchemaForm {
  schema_endpoint?: string
  schema_type: string
  schema_name: string
  schema_body: ISchemaFormProperties
}
