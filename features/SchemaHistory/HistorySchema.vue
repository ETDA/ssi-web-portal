<template>
  <Table @edit="onEdit" :options="tableOptions">
    <template #toolbar>
      <HistorySchemaToolBar :item="item" :onBackClick="onBackClick"/>
    </template>
  </Table>
</template>

<script lang="ts">
import HistorySchemaToolBar from '~/features/SchemaHistory/HistorySchemaToolBar.vue'
import { defineComponent, useAsync, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { columnType, IRow } from '~/components/Table/types'
import { ISchemaItem } from '~/models/schemaModel'
import { useSchemaHistory } from '~/loaders/useSchema'
import { useTable } from '~/hooks/table'

export default defineComponent({
  components: {
    HistorySchemaToolBar
  },
  setup (props, context) {
    const ctx = useContext()
    const router = useRouter()
    const history = useSchemaHistory()
    const item = ref<Object>({})
    const route = useRoute()

    useAsync(async () => {
      await history.fetch(1, '', {
        id: ctx.params.value['id'],
        isMock: true
      })

      item.value = history.items.value[0]
    })

    const tableOptions = useTable({
      repo: history,
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
          value: 'สิทธ์'
        },
        {
          value: 'แก้ไขล่าสุดโดย'
        },
        {
          value: 'วันที่แก้ไขล่าสุด'
        },
        {
          value: 'เวอร์ชั่นล่าสุด'
        },
        {
          value: ''
        }
      ],
      rows: () => history.items.value.map((item: ISchemaItem): IRow => [
            {
              value: item.schema_name
            },
            {
              value: item.schema_type
            },
            {
              value: item.schema_endpoint
            },
            {
              value: item.permission
            },
            {
              value: item.created_by
            },
            {
              value: item.created_at,
              type: columnType.date
            },
            {
              value: item.version
            },
            {
              type: columnType.actions,
              className: 'd-flex justify-content-end',
              props: {
                isHideDelete: true
              }
            }
          ]
      ),
      options: {
        isFlat: true
      }
    })

    const onEdit = (t: ISchemaItem) => {
      router.push({
        path: `/schemas/${1}/edit`
      })
    }

    const onBackClick = () => {
      if (route.value.query.tab) {
        router.push({
          path: `/schemas/?tab=${route.value.query.tab}`
        })
      } else {
        router.push({
          path: `/schemas`
        })
      }
    }

    return {
      tableOptions,
      item,
      history,
      onEdit,
      onBackClick
    }
  }
})
</script>

<style lang="scss" scoped></style>
