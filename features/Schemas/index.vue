<template>
  <div>
    <div class="card">
      <div class="card-header bg-primary">
        <div class="row justify-content-between align-items-center flex-grow-1">
          <div class="col align-items-center">
            <h3
                class="text-temporary text-capitalize font-weight-bold text-size">
              จัดการ Schema
            </h3>
          </div>
        </div>
      </div>
      <Table
          :options="tableOptions().value"
          @pageChange="onFetch"
          @edit="onEdit">
        <template #toolbar>
          <SchemaToolbar
              :endpoint="schemaEndpoint"
              :type="schemaType"
              @upload="onUpload"
              @endpoint="onSelectEndpoint"
              @type="onSelectSchemaType"
              @search="onSearch"
              @create="onAddSchema"/>
        </template>
        <template v-if="!endpoint" #table-body>
          <tr v-if="$array.isEmpty(schemaEndpoint.items.value)">
            <td :colspan="tableOptions().value.columns.length">
              <div class="d-flex flex-column justify-content-center align-items-center py-8">
                <p class="text-gray-500 mb-3">
                  ยังไม่ได้เชื่อมต่อ Endpoint กรุณาไปที่จัดการ Endpoint เพื่อทำการเชื่อมต่อ Endpoint
                </p>
                <LinkButton
                    className="px-3 py-2 mt-3 max-w-min"
                    to="/schemas/endpoint/create"
                    title="จัดการ Endpoint"
                />
              </div>
            </td>
          </tr>
          <tr v-else-if="schemaEndpoint.status.value.isLoaded">
            <td :colspan="tableOptions().value.columns.length">
              <div class="d-flex justify-content-center align-items-center py-10">
                <p class="text-gray-500">
                  กรุณาเลือก Endpoint ที่ต้องการ
                </p>
              </div>
            </td>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, useRouter} from "@nuxtjs/composition-api"
import {useSchema, useSchemaEndpoint, useSchemaType} from "~/loaders/useSchema";
import AppRepository from "~/repositories/AppRepository";
import {useTable} from "~/hooks/table";
import {ISchemaEndpoint, ISchemaItem} from "~/models/schemaModel";
import {columnType, IRow} from "~/components/Table/types";
import {ISchemaItemForm} from "~/store/schemas/schema";
import SchemaToolbar from "~/features/Schemas/SchemaToolbar.vue";
import {ref} from "@vue/composition-api";
import LinkButton from "~/containers/LinkButton.vue";
import {useApp} from "~/hooks/app";

export default defineComponent({
  components: {
    LinkButton,
    SchemaToolbar,
  },
  props: {},
  setup(props, context: any) {
    const app = useApp()
    const router = useRouter()
    const schema = useSchema()
    const schemaType = useSchemaType()
    const schemaEndpoint = useSchemaEndpoint()
    const endpoint = ref<ISchemaEndpoint | null>(null)
    schemaEndpoint.setLoading()

    onMounted(() => {
      schemaEndpoint.fetch()

      app.updateDocMeta({
        title: "จัดการ Schema",
      })

      app.updatePageMeta({
        title: "จัดการ Schema",
        breadcrumb: [AppRepository.menu().home, AppRepository.menu().schemas],
      })
    })

    const tableOptions = () => useTable({
      repo: schema,
      columns: () => [
        {
          value: 'ชื่อ Schema'
        },
        {
          value: 'ประเภท Schema'
        },
        {
          value: 'สิทธิ์'
        },
        {
          value: 'วันที่แก้ไขล่าสุด'
        },
        {
          value: 'เวอร์ชันล่าสุด'
        }
      ],
      rows: () => schema.items.value.map((t: ISchemaItem): IRow => [
            {
              value: t.schema_name,
              type: columnType.link,
              props: {
                to: `/schemas/${endpoint.value?.id}(:)${t.id}/history`
              }
            },
            {
              value: t.schema_type
            },
            {
              value: endpoint.value!.permission || ''
            },
            {
              value: t.created_at,
              type: columnType.date
            },
            {
              value: t.version
            }
          ]
      ),
      options: {
        isFlat: true,
        isLoading: schema.status.value.isLoading || schemaEndpoint.status.value.isLoading,
      },
    })

    const onFetch = (page: number, q: string) => {
      schema.fetch(page, q, {
        ...schema.options.value,
        repoID: endpoint.value!.id,
      })
    }

    const onSelectEndpoint = (_endpoint: ISchemaEndpoint) => {
      schema.clear()
      endpoint.value = _endpoint
      schemaType.run(endpoint.value.id)
      onFetch(1, '')
    }

    const onSelectSchemaType = (type: string) => {
      schema.fetch(1, schema.options.value.search, {
        ...schema.options.value,
        params: {
          ...schema.options.value.params,
          type: type.replaceAll(/\s/g, ''),
        },
        repoID: endpoint.value!.id,
      })
    }

    const onSearch = (q: string) => {
      schema.search(q, {
        ...schema.options.value,
        repoID: endpoint.value?.id,
      })
    }

    const onAddSchema = () => {
      router.push({
        path: '/schemas/create'
      })
    }

    const onEdit = (t: ISchemaItemForm) => {
      router.push({
        path: `/schemas/${t.id}/overview`
      })
    }

    const onUpload = () => {
      router.push({
        path: '/schemas/upload'
      })
    }

    return {
      schemaEndpoint,
      schemaType,
      endpoint,
      tableOptions,
      onFetch,
      onSelectEndpoint,
      onSelectSchemaType,
      onSearch,
      onAddSchema,
      onEdit,
      onUpload,
    }
  },
})
</script>

<style lang="scss" scoped>
.text-size {
  font-size: 2rem !important;
}
</style>
