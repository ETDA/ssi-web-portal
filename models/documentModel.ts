import { IUserPortalItem } from '~/models/userPortalModel'

export interface IDocumentItemForm {
  id: string
  document_name: string
  schema_type: string
  status: string
  created_at: string
  modified_at: string
  signed_by: string
  receive_by: string
  created_by: string
  did?: string
  tag?: string
  json?: string
  cid?: string
}

export interface IDocumentReceive {
  id: string
  name: string
  did: string
  email: string
}

export interface IDocumentUser {
  id: string
  document_name: string
  schema_type: string
}

export interface IDocumentVpItem {
  id: string
  name: string
  status: string
  creator_id: string
  creator: IUserPortalItem
  schema_count: number
  submitted_count: number
  created_at: string
  qr_code_data: object
  updated_at: string
}

export interface IDocumentVpSubmitted {
  id: string;
  requested_vp_id: string;
  requested_vp: IDocumentVpItem;
  holder: string;
  jwt: string;
  tags: string;
  document_count: number;
  created_at: string;
  updated_at: string;
  verify: boolean
}

export interface IVpSubmittedVcItem {
  id: string;
  submitted_vp_id: string;
  cid: string;
  schema_name: string;
  schema_type: string;
  issuance_date: string;
  issuer: string;
  holder: string;
  jwt: string;
  status: string;
  verify: boolean;
  created_at: string;
  updated_at: string;
}
