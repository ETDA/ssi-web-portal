import {BasePageRepository} from "~/repositories/BaseRepository";
import {documentStateMeta, IDocumentItemForm} from "~/store/documents/document";

export default class DocumentRepository extends BasePageRepository<IDocumentItemForm, any, any> {
    meta = documentStateMeta
}
