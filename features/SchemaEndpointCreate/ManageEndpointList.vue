<template>
  <Table
      title="จัดการ Schema Endpoint"
      @search="onSearch"
      :options="tableOptions">
  </Table>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { onMounted, ref } from '@vue/composition-api'
import { columnType, IRow } from '~/components/Table/types'
import { DialogConfirmIconType, useDialog } from '~/hooks/dialog'
import { ISchemaEndpoint } from '~/models/schemaModel'
import { useSchemaEndpoint } from '~/loaders/useSchema'
import { useTable } from '~/hooks/table'
import { useWatchTrue } from '~/hooks/watch'
import { IStatus } from '~/lib/state/types'
import ColumnAction from '~/features/SchemaEndpointCreate/ColumnAction.vue'

export default defineComponent({
  props: {
    addStatus: {
      type: Object as () => IStatus,
      required: true
    }
  },
  setup (props, context) {
    const dialog = useDialog()
    const endpoint = useSchemaEndpoint()
    const item = ref<object>({})

    endpoint.setLoading()
    onMounted(() => {
      endpoint.fetch(1, '')
    })

    const tableOptions = useTable({
      repo: endpoint,
      columns: () => [
        {
          value: 'Schema service name'
        },
        {
          value: 'Endpoint URL'
        },
        {
          value: 'Access Key'
        },
        {
          value: 'สิทธิ์'
        },
        {
          value: '',
          className: 'd-flex justify-content-center'
        }
      ],
      rows: () => endpoint.items.value.map((item: ISchemaEndpoint): IRow => [
            {
              value: item.name
            },
            {
              value: item.endpoint
            },
            {
              value: item.access_token
            },
            {
              value: item.permission
            },
            {
              type: columnType.component,
              value: ColumnAction,
              props: {
                item: item,
                onDelete: () => onDelete(item)
              }
            }
          ]
      ),
      options: {
        isFlat: false
      }
    })

    const onDelete = (item: ISchemaEndpoint) => {
      endpoint.remove(item.id)
    }

    const onSearch = (q: string) => {
      endpoint.search(q)
    }

    useWatchTrue(() => endpoint.deleteStatus.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'ยกเลิกการเชื่อมต่อ Schema เสร็จสมบูรณ์',
        description: 'ระบบดำเนินการยกเลิกการเชื่อมต่อเรียบร้อย'
      })

      endpoint.fetch()
    })

    useWatchTrue(() => props.addStatus.isSuccess, () => {
      endpoint.fetch(1, '')
    })

    return {
      tableOptions,
      item,
      onDelete,
      onSearch
    }
  }
})
</script>

<style lang="scss" scoped></style>
