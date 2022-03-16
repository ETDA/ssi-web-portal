import { IUserPortalItem } from '~/models/userPortalModel'

export interface IVPRequestItem {
  id: string;
  name: string;
  status: string;
  creator: IUserPortalItem;
  schema_count: number;
  created_at: string;
  updated_at: string;
  schema_list: IVPRequestSchemaItem[];
  qr_code_data: IVPRequestQrCodeDataItem;
  submitted_count: number;
}

export interface IVPRequestQrCodeDataItem {
  endpoint: string;
  operation: string;
}

export interface IVPRequestSchemaItem {
  id: string;
  requested_vp_id: string;
  schema_type: string;
  is_required: boolean;
  noted: string;
  created_at: Date;
  updated_at: Date;
}

export interface IVPSubmittedItem {

}
