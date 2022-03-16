import {BasePageRepository} from "~/repositories/BaseRepository";
import {ISchemaHistoryItem, schemaHistoryStateMeta} from "~/store/schemas/schemaHistory";

export default class SchemaHistoryRepository extends BasePageRepository<ISchemaHistoryItem, any, any> {
    meta = schemaHistoryStateMeta
}
