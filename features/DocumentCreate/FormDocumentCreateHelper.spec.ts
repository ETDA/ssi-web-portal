import FormDocumentCreateHelper from "./FormDocumentCreateHelper";
import {ISchemaFormProperties} from "../SchemaCreate/types";

describe('FormDocumentCreateHelper', () => {
  test('transformSchemaProperties work fine', () => {
    let schemaForm: ISchemaFormProperties = {
      "name": {"name": "Property ใหม่", "type": "string", "required": true, "alias": "name"},
      "last": {"name": "Property ใหม่", "type": "string", "required": true, "alias": "last"},
      "obj": {
        "name": "Property ใหม่",
        "type": "object",
        "required": true,
        "alias": "obj",
        "properties": {
          "name": {"name": "Property ใหม่", "type": "string", "required": true, "alias": "name"},
          "last": {"name": "Property ใหม่", "type": "string", "required": true, "alias": "last"}
        }
      }
    }

    console.log(JSON.stringify(FormDocumentCreateHelper.transformSchemaProperties(schemaForm)))
  })

  test('initDetail work fine', () => {
    let schemaBody: any = {
      "$id": "https://ssi-test.teda.th/api/schemas/bdc556af-6ab5-47c0-aea5-0b308a1a64c1/1.0.7/schema",
      "$schema": "https://json-schema.org/draft/2020-12/schema#",
      "required": [
        "last_name",
        "first_name"
      ],
      "properties": {
        "address": {
          "type": "object",
          "alias": "ที่อยู่",
          "required": [
            "province",
            "district",
            "sub_district",
            "zipcode"
          ],
          "properties": {
            "zipcode": {
              "type": "string",
              "alias": "รหัสไปรษณีย์",
              "description": ""
            },
            "district": {
              "type": "string",
              "alias": "ตำบล",
              "description": ""
            },
            "province": {
              "type": "string",
              "alias": "จังหวัด",
              "description": ""
            },
            "sub_district": {
              "type": "string",
              "alias": "อำเภอ",
              "description": ""
            }
          },
          "description": ""
        },
        "last_name": {
          "type": "string",
          "alias": "นามสกุล",
          "description": ""
        },
        "first_name": {
          "type": "string",
          "alias": "ชื่อจริง",
          "description": ""
        }
      }
    }
  })

  test('transformVCCredentialSubject work fine', () => {
    let formDetail = {
      "address": {
        "label": "ที่อยู่",
        "name": "address",
        "required": false,
        "type": "object",
        "value": {
          "c24dfa65-f3ad-40d5-a39c-d653e2572ad5": {
            "type": "string",
            "value": {
              "zipcode": {
                "label": "รหัสไปรษณีย์",
                "name": "zipcode",
                "required": true,
                "type": "string",
                "value": "a"
              },
              "district": {"label": "ตำบล", "name": "district", "required": true, "type": "string", "value": "b"},
              "province": {"label": "จังหวัด", "name": "province", "required": true, "type": "string", "value": "c"},
              "sub_district": {
                "label": "อำเภอ",
                "name": "sub_district",
                "required": true,
                "type": "string",
                "value": "d"
              }
            }
          }
        }
      },
      "86914802-de9d-4c90-a95a-2e1ddafdde7c": {
        "type": "string",
        "value": {
          "last_name": {
            "label": "นามสกุล",
            "name": "last_name",
            "required": true,
            "type": "string",
            "value": "a"
          }, "first_name": {"label": "ชื่อจริง", "name": "first_name", "required": true, "type": "string", "value": "b"}
        }
      }
    }

    console.log(JSON.stringify(FormDocumentCreateHelper.transformVCCredentialSubject(formDetail)))
  })
})
