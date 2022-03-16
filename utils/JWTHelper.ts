import jwt_decode from "jwt-decode";

export interface IJWT {
  exp: 0
  iat: 0
  iss: string
  jti: string
  nbf: number
  nonce: string
  sub: string
  aud: string
  vc?: any
  vp?: any
}

export default class JWTHelper {
  static decodeJWT(jwt: string): IJWT {
    return jwt_decode<IJWT>(jwt)
  }
}
