import { Core } from '~/core/Core'
import { useStore } from '@nuxtjs/composition-api'
import { IVCItem } from '~/models/vcModel'
import { IPageFetchLoaderOptions, usePageLoader } from '~/hooks/loaderPage'
import JWTHelper, { IJWT } from '~/utils/JWTHelper'

export const useVC = () => {
  const { state } = useStore()
  return usePageLoader<IVCItem>({
    baseURL: Core.DefaultAPI('/web/vcs'),
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    transformFindItem: (data) => {
      let jwtDecode: IJWT | null = null
      if (data.status === 'ACTIVE' || data.status === 'REVOKED') {
        try {
          jwtDecode = JWTHelper.decodeJWT(data.jwt)
        } catch (e) {
        }
      } else {
        jwtDecode = JSON.parse((new Buffer(data.jwt, 'base64')).toString())
      }

      return {
        ...data,
        jwt_decode: jwtDecode
      }
    },
    transformFetchItems: (items) => (items.map((item) => {
      let jwtDecode: IJWT | null = null
      try {
        jwtDecode = JWTHelper.decodeJWT(item.jwt)
      } catch (e) {
      }
      return {
        ...item,
        jwt_decode: jwtDecode
      }
    }))
  })
}

export const useVCByDID = () => {
  const { state } = useStore()
  return usePageLoader<IVCItem>({
    baseURL: Core.DefaultAPI('/web/vcs/did/:did'),
    getFetchBaseURL: (opts: IPageFetchLoaderOptions) => `${Core.DefaultAPI(`/web/vcs/did/${opts.did}`)}`,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    transformFindItem: (data) => {
      let jwtDecode: IJWT | null = null
      try {
        jwtDecode = JWTHelper.decodeJWT(data.jwt)
      } catch (e) {
      }
      return {
        ...data,
        jwt_decode: jwtDecode
      }
    },
    transformFetchItems: (items) => (items.map((item) => {
      let jwtDecode: IJWT | null = null
      try {
        jwtDecode = JWTHelper.decodeJWT(item.jwt)
      } catch (e) {
      }
      return {
        ...item,
        jwt_decode: jwtDecode
      }
    }))
  })
}

export const useVCQRCode = () => {
  const { state } = useStore()
  return usePageLoader<IVCItem>({
    baseURL: Core.DefaultAPI('/web/vcs/qr'),
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useVCRevoke = () => {
  const { state } = useStore()
  return usePageLoader<any>({
    baseURL: Core.DefaultAPI('/web/vcs'),
    getAddBaseURL: (opts: IPageFetchLoaderOptions) => `/web/vcs/${opts.cid}/revoke`,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}
