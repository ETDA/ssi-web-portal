export interface IVCItem {
  id: string
  cid: string
  schema_name?: string
  schema_type: string
  issuance_date: string
  issuer: string
  holder: string
  tags: string[]
  jwt: string
  jwt_decode?: {
    vc: {
      credentialSubject: any
      credentialSchema: {
        id: string
        type: string
      }
      [key: string]: any
    }
    [key: string]: any
  }
  status: string
  creator: {
    created_at: string
    date_of_birth: string
    email: string
    first_name: string
    id: string
    last_name: string
    organization_id: string
    role: string
    status: string
  }
}

export interface IVCQRCodeItem {
  id: string
  cid: string
  schema_type: string
  issuance_date: string
  issuer: string
  holder: string
  jwt: string
  status: string
}
