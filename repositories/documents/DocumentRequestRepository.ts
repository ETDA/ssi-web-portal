import {BasePageRepository} from "~/repositories/BaseRepository";
import {documentRequestStateMeta} from "~/store/documents/documentRequest";

export default class DocumentRequestRepository extends BasePageRepository<any, any, any> {
    meta = documentRequestStateMeta
}
