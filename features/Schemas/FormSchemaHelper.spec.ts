import {ISchemaItem} from "../../store/schemas/schema";
import FormSchemaHelper from "./FormSchemaHelper";

describe('FormSchemaHelper', () => {
  test('initOverview', () => {
    const schema: ISchemaItem = {
      "id": "d31c78cd-8473-4c01-a01a-502b6daebc85",
      "schema_name": "ใบรับรองแพทมหาวิทยาลัยเชิงชายแห่งฟินีม่า ฉบับปรังปรุงครั้งที่ 1",
      "schema_type": "ใบรับรองแพท",
      "schema_body": {
        "$id": "https://ssi-test.teda.th/api/schemas/d31c78cd-8473-4c01-a01a-502b6daebc85/1.0.1/schema",
        "$schema": "https://json-schema.org/draft/2020-12/schema#",
        "required": [
          "first_name",
          "last_name"
        ],
        "properties": {
          "address": {
            "type": "object",
            "required": [
              "province",
              "district",
              "sub_dictrict",
              "zipcode"
            ],
            "properties": {
              "zipcode": {
                "type": "string",
                "description": ""
              },
              "district": {
                "type": "string",
                "description": ""
              },
              "province": {
                "type": "string",
                "description": ""
              },
              "sub_dictrict": {
                "type": "string",
                "description": ""
              }
            }
          },
          "last_name": {
            "type": "string",
            "description": ""
          },
          "first_name": {
            "type": "string",
            "description": "ชื่อจริง"
          }
        }
      },
      "created_at": "2021-08-25T09:27:56Z",
      "version": "1.0.1",
    }
    const form = FormSchemaHelper.initOverview(schema)

    // Test with your eye.
    console.log(JSON.stringify(form))
  })
})
