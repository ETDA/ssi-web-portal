<template>
  <div>
    <Table
      :options="tableOptions"
      @pageChange="connect.fetch"
      @edit="onEdit"
      @delete="onDelete"
    >
      <template #toolbar>
        <SchemaHeader
          @search="connect.search"
          @order="onOrder"
          :isEndpoint="true"
        >
          <template #tooltip-secondary>
            <PrimaryButton
              @click="onEndpointSchemaCreate"
              name="จัดการ Endpoint"
            />
            <div class="pl-2 mb-0"></div>
            <PrimaryButton @click="onUploadSchema" name="อัปโหลด Schema" />
          </template>
        </SchemaHeader>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, useRouter,} from "@nuxtjs/composition-api"
import {columnType, IRow} from "~/components/Table/types"
import TableHeader from "~/components/Table/TableHeader.vue"
import PrimaryButton from "~/containers/PrimaryButton.vue"
import {useTable} from "~/hooks/table"
import {useSchema} from "~/loaders/useSchema"
import {ISchemaItem} from "~/models/schemaModel"
import SchemaHeader from "~/features/Schemas/SchemaHeader.vue"

interface Props {}

export default defineComponent<Props>({
  components: { PrimaryButton, TableHeader, SchemaHeader },
  props: {},
  setup(props: Props, context) {
    const router = useRouter()
    const connect = useSchema()

    onMounted(() => {
      connect.fetch()
    })

    const tableOptions = useTable({
      repo: connect,
      columns: () => [
        {
          value: "ชื่อ Schema",
        },
        {
          value: "ประเภท Schema",
        },
        {
          value: "Schema Service Name",
        },
        {
          value: "Schema Endpoint",
        },
        {
          value: "สิทธ์",
        },
        {
          value: "แก้ไขล่าสุดโดย",
        },
        {
          value: "วันที่แก้ไขล่าสุด",
        },
        {
          value: "เวอร์ชั่นล่าสุด",
        },
      ],
      rows: () =>
        connect.items.value.map(
          (item: ISchemaItem): IRow => [
            {
              value: item.schema_name,
              type: columnType.link,
              props: {
                to: `/schemas/${item.id}/history/?tab=SchemaConnect`,
              },
            },
            {
              value: item.schema_type,
            },
            {
              value: item.schema_name,
            },
            {
              value: item.schema_endpoint,
            },
            {
              value: item.permission,
            },
            {
              value: item.created_by,
            },
            {
              value: item.created_at,
              type: columnType.date,
            },
            {
              value: item.version,
            },
          ]
        ),
      options: {
        isFlat: true,
      },
    })

    const onFetch = (page: number, q: string) => {
      console.log(page)
      console.log(q)
    }

    const onSearch = (q: string) => {
      connect.fetch()
      console.log(q)
    }

    const onOrder = (order: string) => {
      console.log(order)
    }

    const onEndpointSchemaCreate = () => {
      router.push({
        path: "/schemas/endpoint/create",
      })
    }

    const onUploadSchema = () => {
      router.push({
        path: "/schemas/upload",
      })
    }

    const onImportSchema = () => {
      router.push({
        path: "/schemas/endpoint/import",
      })
    }

    const onEdit = (t: ISchemaItem) => {
      router.push({
        path: `/schemas/${t.id}/overview`,
      })
    }

    const onDelete = () => {}

    return {
      tableOptions,
      connect,
      onImportSchema,
      onOrder,
      onEndpointSchemaCreate,
      onUploadSchema,
      onEdit,
      onDelete,
    }
  },
})
</script>

<style lang="scss" scoped></style>
