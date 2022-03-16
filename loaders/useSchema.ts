import { Core } from '~/core/Core'
import { useObjectLoader } from '~/hooks/loaderObject'
import { IPageDeleteLoaderOptions, IPageFetchLoaderOptions, usePageLoader } from '~/hooks/loaderPage'
import { NewRequester } from '~/lib/Requester'
import { schemaEndpointMockData } from '~/mocks/shemas/schemaEndpoint'
import { ISchemaEndpoint, ISchemaEndpointKeyItem, ISchemaItem } from '~/models/schemaModel'
import { useStore } from '@nuxtjs/composition-api'

export const useSchemaEndpoint = () => {
  const { state } = useStore()
  return usePageLoader<ISchemaEndpoint>({
    baseURL: Core.DefaultAPI('/web/configs/schemas'),
    mockItems: schemaEndpointMockData,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useSchemaEndpointKey = () => {
  const { state } = useStore()
  return usePageLoader<ISchemaEndpointKeyItem>({
    baseURL: Core.DefaultAPI('/web/schemas/{{ _.schema_repository_id }}/tokens'),
    getFetchBaseURL: (opts: IPageFetchLoaderOptions) => Core.DefaultAPI(`/web/schemas/${opts.schemaRepoId}/tokens`),
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteBaseURL: (id: string, opts: IPageDeleteLoaderOptions) => Core.DefaultAPI(`/web/schemas/${opts.schemaRepoId}/tokens/${id}`),
    getAddBaseURL: (opts: IPageDeleteLoaderOptions) => Core.DefaultAPI(`/web/schemas/${opts.schemaRepoId}/tokens`)
  })
}

export const useSchemaCreateByUpload = () => {
  const { state } = useStore()
  const loader = useObjectLoader<any>()
  const run = (repoID: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    loader.run(() => NewRequester.post(Core.DefaultAPI(`/web/schemas/${repoID}/upload`), formData, {
      ...Core.DefaultAPIOptions(state)
    }))
  }
  return {
    ...loader, run
  }
}

export const useSchemaUpdateByUpload = () => {
  const { state } = useStore()
  const loader = useObjectLoader<any>()
  const run = (repoID: string, schemaID: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    loader.run(() => NewRequester.post(Core.DefaultAPI(`/web/schemas/${repoID}/${schemaID}/upload`), formData, {
      ...Core.DefaultAPIOptions(state)
    }))
  }
  return {
    ...loader, run
  }
}

export const useSchema = () => {
  const { state } = useStore()
  return usePageLoader<ISchemaItem>({
    baseURL: Core.DefaultAPI('/web/schemas'),
    getFetchBaseURL: (opts: IPageFetchLoaderOptions) => `/web/schemas/${opts.repoID}`,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindBaseURL: (id: string, opts: IPageFetchLoaderOptions) => `/web/schemas/${opts.repoID}/${id}${opts.version ? `/${opts.version}` : ''}`,
    getUpdateBaseURL: (id: string, opts: IPageFetchLoaderOptions) => `/web/schemas/${opts.repoID}/${id}`,
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddBaseURL: (opts: IPageFetchLoaderOptions) => `/web/schemas/${opts.repoID}`,
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}

export const useSchemaType = () => {
  const { state } = useStore()
  const loader = useObjectLoader<{ types: string[] }>()
  const run = (endpointId: string, q: string = '') => {
    loader.run(() => NewRequester.get(Core.DefaultAPI(`/web/schemas/${endpointId}/types`), {
      ...Core.DefaultAPIOptions(state),
      params: {
        q
      }
    }))
  }
  return {
    ...loader,
    run
  }
}

export const useSchemaHistory = <T = ISchemaItem> () => {
  const { state } = useStore()
  return usePageLoader<T>({
    baseURL: Core.DefaultAPI('web/schemas/history'),
    getFetchBaseURL: (opts: IPageFetchLoaderOptions) => `web/schemas/${opts.repoID}/${opts.schemaID}/history`,
    getFetchOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getFindBaseURL: (id: string, opts: IPageFetchLoaderOptions) => `web/schemas/${opts.repoID}/${id}/history`,
    getFindOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getUpdateOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getAddBaseURL: (opts: IPageFetchLoaderOptions) => `/web/schemas/${opts.repoID}`,
    getAddOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state),
    getDeleteOptions: (opts: IPageFetchLoaderOptions) => Core.DefaultAPIOptions(state)
  })
}
