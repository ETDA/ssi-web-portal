export interface IRequestDocumentFormDocument {
    id: string
    title: string
    required: boolean
    additional: string
}

export interface IRequestDocumentForm {
    documents: IRequestDocumentFormDocument[]
}

export class FormRequestDocumentHelper {
    static init = (): IRequestDocumentForm => {
        return {
            documents: []
        }
    }
}
