import {IOrganizationItem} from "./organizationModel";

export interface IUserPortalItem {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  role: string;
  date_of_birth: string;
  organization_id: string;
  organization?: IOrganizationItem;
  created_at: string;
  updated_at: string;
}
