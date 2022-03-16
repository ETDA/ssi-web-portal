import {IOrganizationItem} from '~/models/organizationModel'

export interface IMeState {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  role: string;
  token: string;
  organization_id: string;
  organization: IOrganizationItem;
  created_at: string;
  updated_at: string;
}
