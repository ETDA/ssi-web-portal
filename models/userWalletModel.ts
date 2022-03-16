export interface IUserWalletItem {
  id: string;
  name: string;
  card_id: string;
  id_card_no: string;
  did_address: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface IUserWalletGroupItem {
  id: string;
  name: string;
  isStatic: boolean;
  user_count: number;
  created_at: string;
  updated_at: string;
}
