import {ISchemaHistoryItem} from "~/store/schemas/schemaHistory";

export const schemaHistoryMockData: ISchemaHistoryItem = {
    schemas: [
        {
            id: 'h01',
            version: '1.1.0',
            created_at: '2021-06-01 00:00:01',
        },
        {
            id: 'h02',
            version: '1.0.2',
            created_at: '2021-02-11 00:00:01',
        },
        {
            id: 'h03',
            version: '1.0.1',
            created_at: '2021-01-28 00:00:01',
        },
        {
            id: 'h04',
            version: '1.0.0',
            created_at: '2020-12-21 00:00:01',
        },
    ]
}
