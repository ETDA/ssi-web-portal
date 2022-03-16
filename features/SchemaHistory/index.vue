<template>
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
        :options="tableOptions">
      <template v-if="schema.findStatus.value.isSuccess" #toolbar>
        <div class="d-flex align-items-center py-6 px-3 bg-primary-light">
          <i class="tio-document-text-outlined text-xl text-primary mr-3"/>
          <h6 class="mr-3">
            {{ schema.findItem.value.schema_name }}
          </h6>
          <p>
            {{ schema.findItem.value.schema_type }}
          </p>
        </div>
        <div class="d-flex align-items-center py-4 px-3">
          <i class="tio-chevron-left text-link mr-1"/>
          <NuxtLink to="/schemas">
            กลับหน้ารายการ
          </NuxtLink>
        </div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import { useSchema, useSchemaEndpoint, useSchemaHistory } from '~/loaders/useSchema'
import { useTable } from '~/hooks/table'
import { ISchemaItem } from '~/models/schemaModel'
import { columnType, IRow } from '~/components/Table/types'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { useWatchTrue } from '~/hooks/watch'
import { useApp } from '~/hooks/app'

export default defineComponent({
  props: {
    endpointID: {
      type: String,
      required: true
    },
    schemaID: {
      type: String,
      required: true
    }
  },
  setup (props, context: any) {
    const schema = useSchema()
    const schemaHistory = useSchemaHistory()
    const schemaEndpoint = useSchemaEndpoint()
    const app = useApp()
    schema.setFindLoading()
    schemaHistory.setFindLoading()
    schemaEndpoint.setFindLoading()

    onMounted(() => {
      schema.find(props.schemaID, {
        repoID: props.endpointID
      })
      schemaEndpoint.find(props.endpointID)
      schemaHistory.find(props.schemaID, {
        repoID: props.endpointID
      })

    })

    useWatchTrue(() => schema.findStatus.value.isSuccess, () => {
      app.updatePageMeta({
        title: AppRepository.menu().schemas.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().schemas,
          {
            name: schema.findItem.value?.schema_name || ''
          }
        ]
      })
      app.updateDocMeta({
        title: schema.findItem.value?.schema_name
      })
    })

    const tableOptions = useTable({
      repo: { ...schemaHistory, status: schemaHistory.findStatus },
      columns: () => [
        {
          value: 'ชื่อ Schema'
        },
        {
          value: 'ประเภท Schema'
        },
        {
          value: 'Schema Endpoint'
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
      rows: () => ArrayHelper.toArray(schemaHistory.findItem.value).map((t: ISchemaItem): IRow => [
            {
              value: t.schema_name,
              type: columnType.link,
              props: {
                to: `/schemas/${props.endpointID}(:)${t.id}(:)${t.version}/overview`
              }
            },
            {
              value: t.schema_type
            },
            {
              value: schemaEndpoint.findItem.value?.name
            },
            {
              value: schemaEndpoint.findItem.value?.permission
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
        isHidePagination: true,
        isFlat: true
      }
    })

    return {
      tableOptions,
      schema,
      schemaHistory,
      schemaEndpoint
    }
  }
})
</script>

<style lang="scss" scoped>
.text-size {
  font-size: 2rem !important;
}
</style>
