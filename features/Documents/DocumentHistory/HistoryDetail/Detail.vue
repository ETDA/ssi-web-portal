<template>
  <div>
    <Loading :isLoading="vp.status.value.isLoading">
      <DetailToolBar
          :item="vp.data.value"
          v-if="vp.data.value"
          :onBackClick="onBackClick"/>
    </Loading>
    <div class="detail-box">
      <Table
          :options="tableOptions">
        <template #toolbar>
          <h3 class="text-primary" style="padding: 1rem">รายการเอกสาร</h3>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import HistoryDocumentToolBar from '~/features/Documents/DocumentHistory/HistoryDocumentToolBar.vue'
import { defineComponent, onMounted, useContext, useRouter } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { columnType, IRow } from '~/components/Table/types'
import { useTable } from '~/hooks/table'
import { useVpSubmittedItem, useVpSubmittedVc } from '~/loaders/useDocument'
import DetailToolBar from '~/features/Documents/DocumentHistory/HistoryDetail/DetailToolBar.vue'

export default defineComponent({
  components: {
    HistoryDocumentToolBar,
    DetailToolBar
  },
  setup (props, context) {
    const ctx = useContext()
    const router = useRouter()
    const item = ref<any>({})
    const title = ref<any>('')
    const vc = useVpSubmittedVc()
    const vp = useVpSubmittedItem()

    vp.setLoading()
    vc.setLoading()

    onMounted(() => {
      onFetch()
      vp.run(ctx.params.value['user_id'])
    })

    const onFetch = () => {
      vc.fetch(1, '', { id: ctx.params.value['user_id'] })
    }

    const tableOptions = useTable({
      repo: vc,
      columns: () => [
        {
          value: 'ชื่อเอกสาร'
        },
        {
          value: 'ประเภท Schema'
        }
      ],
      rows: () => vc.items.value.map((item): IRow => [
            {
              value: item.schema_name || '-',
              type: columnType.link,
              props: {
                to: `/documents/${ctx.params.value['id']}/history/${ctx.params.value['user_id']}/vcs/${item.id}`
              }
            },
            {
              value: item.schema_type
            }
          ]
      ),
      options: {
        isHidePagination: true
      }
    })

    const onBackClick = () => {
      router.push({
        path: `/documents/${ctx.params.value['id']}/history`
      })
    }

    return {
      tableOptions,
      item,
      onBackClick,
      vp,
      vc,
      title
    }
  }
})
</script>

<style lang="scss" scoped>
.detail-box {
  margin: 0 1.3125rem 2rem;
}
</style>
