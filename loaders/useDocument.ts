import { IPageFetchLoaderOptions, usePageLoader } from '~/hooks/loaderPage'
import {
  documentMockDisplay,
  documentMockItems,
  documentReceiveMock,
  documentUserMock,
  documentVpMock
} from '~/mocks/documents/document'
import {
  IDocumentItemForm,
  IDocumentReceive,
  IDocumentUser,
  IDocumentVpItem,
  IDocumentVpSubmitted,
  IVpSubmittedVcItem
} from '~/models/documentModel'
import { Core } from '~/core/Core'
import { useStore } from '@nuxtjs/composition-api'
import { useObjectLoader } from '~/hooks/loaderObject'
import { NewRequester } from '~/lib/Requester'

export const useDocumentItem = () => {
  return usePageLoader<IDocumentItemForm>({
    baseURL: '/document/',
    mockItems: documentMockItems,
    getFetchBaseURL: (opts) => `/document/${opts.id}`
  })
}

export const useDocumentVc = () => {
  const { state } = useStore()
  return usePageLoader<IDocumentItemForm>({
    baseURL: Core.DefaultAPI('web/vcs'),
    mockItems: documentMockItems,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useDocumentVp = () => {
  const { state } = useStore()
  return usePageLoader<IDocumentItemForm>({
    baseURL: Core.DefaultAPI('/web/requested-vps'), mockItems: documentMockDisplay,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useDocumentVpSubmitted = () => {
  const { state } = useStore()
  return usePageLoader<IDocumentVpSubmitted>({
    baseURL: Core.DefaultAPI('/web/requested-vps/:id/submitted-vps'),
    getFetchBaseURL: (opts: IPageFetchLoaderOptions) => Core.DefaultAPI(`/web/requested-vps/${opts.vpId}/submitted-vps`),
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useVpSubmittedVc = () => {
  const { state } = useStore()
  return usePageLoader<IVpSubmittedVcItem>({
    baseURL: Core.DefaultAPI('/web/submitted-vps/:id/vcs'),
    getFetchBaseURL: (opts: IPageFetchLoaderOptions) => Core.DefaultAPI(`/web/submitted-vps/${opts.id}/vcs`),
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useVpSubmittedItem = () => {
  const { state } = useStore()
  const loader = useObjectLoader<IDocumentVpSubmitted>()
  const run = (id: string) => {
    loader.run(() => NewRequester.get(Core.DefaultAPI(`/web/submitted-vps/${id}`), Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader, run
  }
}

export const useVpSubmittedVcItem = () => {
  const { state } = useStore()
  const loader = useObjectLoader<{
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
    tags: string;
    verify: boolean;
    created_at: string;
    updated_at: string;
  }>()
  const run = (vpId: string, vcId: string) => {
    loader.run(() => NewRequester.get(Core.DefaultAPI(`/web/submitted-vps/${vpId}/vcs/${vcId}`), Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader, run
  }
}

export const useVpSubmittedTagsCreate = () => {
  const { state } = useStore()
  const loader = useObjectLoader<IDocumentVpSubmitted>()
  const run = (id: string, tags: string[]) => {
    loader.run(() => NewRequester.post(Core.DefaultAPI(`/web/submitted-vps/${id}/tag`), { tags }, Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader, run
  }
}

export const useDocumentVps = () => {
  const { state } = useStore()
  return usePageLoader<IDocumentVpItem>({
    baseURL: Core.DefaultAPI('/web/requested-vps'), mockItems: documentVpMock,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useUpdateVpStatus = () => {
  const { state } = useStore()
  const loader = useObjectLoader<any>()
  const run = (id: string, status: string) => {
    loader.run(() => NewRequester.put(Core.DefaultAPI(`/web/requested-vps/${id}`), { status }, Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader, run
  }
}

export const useCancelVp = () => {
  const { state } = useStore()
  const loader = useObjectLoader<any>()
  const run = (ids: string[]) => {
    loader.run(() => NewRequester.post(Core.DefaultAPI(`/web/requested-vps/cancel`), { ids }, Core.DefaultAPIOptions(state)))
  }
  return {
    ...loader, run
  }
}

export const useCreateVcsQrcode = () => {
  const loader = useObjectLoader<any>()
  const run = (cids: string[]) => {
    const data = {
      cids
    }
    loader.run(() => NewRequester.post(Core.DefaultAPI('/web/vcs/qr'), data))
  }
  return {
    ...loader, run
  }
}

export const useVerifyDocument = () => {
  const loader = useObjectLoader<any>()
  const run = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    loader.run(() => NewRequester.post(Core.DefaultAPI('/web/vcs/verify'), formData))
  }
  return {
    ...loader, run
  }
}

export const useDocumentRecieve = () => {
  const { state } = useStore()
  return usePageLoader<IDocumentReceive>({
    baseURL: Core.DefaultAPI('web/receive'), mockItems: documentReceiveMock,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useDocumentDisplay = () => {
  return usePageLoader<IDocumentItemForm>({
    baseURL: '/document/',
    mockItems: documentMockDisplay,
    getFetchBaseURL: (opts) => `/document/${opts.id}`
  })
}

export const useDocumentUser = () => {
  const { state } = useStore()
  return usePageLoader<IDocumentUser>({
    baseURL: Core.DefaultAPI('web/vps/user'), mockItems: documentUserMock,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}
