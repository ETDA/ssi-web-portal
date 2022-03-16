import {IActionOptions, IStateContext} from '~/lib/state/types'
import {Core} from '~/core/Core'
import {page} from "~/lib/state/page";
import {documentMockItems} from "~/mocks/documents/document";

const prefix = 'documents/document'

export interface IDocumentItemForm {
    id: string
    document_name: string
    schema_type: string
    status: string
    created_at: string
    created_by: string
}

export const state = () => page.state()
export const mutations = page.mutations()
export const actions = {
    ...page.actions((ctx: IStateContext, data: any): IActionOptions => {
        return {
            baseURL: Core.DefaultAPI('web/document'),
            baseFindURL: Core.DefaultAPI(`web/document/${data?.id}`),
            baseUpdateURL: Core.DefaultAPI(`web/document/${data?.id}`),
            baseDeleteURL: Core.DefaultAPI(`web/document/${data?.id}`),

            options: {
                ...(data?.options || {}),
                mockItems: documentMockItems,
            },
        }
    }),
}

export const getters = page.getters()
export const documentStateMeta = page.getStateMeta(prefix)

