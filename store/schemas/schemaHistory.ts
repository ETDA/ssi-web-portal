import {IActionOptions, IStateContext} from '~/lib/state/types'
import {Core} from '~/core/Core'
import {page} from "~/lib/state/page";
import {schemaHistoryMockData} from "~/mocks/shemas/schemaHistory";

const prefix = 'schemas/schemaHistory'

export interface ISchemaHistoryItemSchemaItem {
    id: string
    version: string
    created_at: string
}

export interface ISchemaHistoryItem {
    schemas: ISchemaHistoryItemSchemaItem[]
}

export const state = () => page.state()
export const mutations = page.mutations()
export const actions = {
    ...page.actions((ctx: IStateContext, data: any): IActionOptions => {
        return {
            baseURL: Core.DefaultAPI(`web/schema`),
            baseFindURL: Core.DefaultAPI(`web/schema/${data?.id}/history`),
            options: {
                ...(data?.options || {}),
                mockData: schemaHistoryMockData,
                transformData: (data: ISchemaHistoryItem) => ({
                    ...data,
                    schemas: data.schemas.map((s: ISchemaHistoryItemSchemaItem) => ({
                        ...s,
                        created_at: s.created_at || '-'
                    })),
                })
            },
        }
    }),
}

export const getters = page.getters()
export const schemaHistoryStateMeta = page.getStateMeta(prefix)

