import { ISchemaBodyItem } from '~/features/SchemaCreate/types'

export interface ISchemaItem {
  id: string
  schema_name: string
  schema_type: string
  schema_body: ISchemaBodyItem
  schema_endpoint: string
  permission: string
  version: string
  tag: string
  created_by: string
  created_at: string
}

export interface ISchemaEndpoint {
  id: string
  name: string
  endpoint: string
  access_token: string
  permission: string
  created_at: string
  updated_at: string
}

export interface ISchemaEndpointKeyItem {
  id: string;
  name: string;
  token: string;
  role: string;
  created_at: string;
  updated_at?: string;
}
