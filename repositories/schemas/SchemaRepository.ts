import {BasePageRepository} from "~/repositories/BaseRepository";
import {ISchemaItemForm, schemaStateMeta} from "~/store/schemas/schema";

export default class SchemaRepository extends BasePageRepository<ISchemaItemForm, any, any> {
  meta = schemaStateMeta
}
