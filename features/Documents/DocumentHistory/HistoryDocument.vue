<template>
  <Table
      :options="tableOptions"
      @pageChange="onFetchVPSubmitted">
    <template #toolbar>
      <HistoryDocumentToolBar
          :item="documentVp.findItem.value || {}"
          :status="documentVp.findStatus.value"
          :onBackClick="onBackClick"
          @update="onDateChange"
          @toggle="onToggle"
          @cancel="onCancel"
      />
    </template>
  </Table>
</template>

<script lang="ts">
import HistoryDocumentToolBar from '~/features/Documents/DocumentHistory/HistoryDocumentToolBar.vue'
import { defineComponent, onMounted, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { columnType, IRow } from '~/components/Table/types'
import { DialogConfirmIconType, useDialog } from '~/hooks/dialog'
import { useTable } from '~/hooks/table'
import { useDocumentVps, useDocumentVpSubmitted, useUpdateVpStatus } from '~/loaders/useDocument'
import { useWatchTrue } from '~/hooks/watch'
import { IDocumentVpSubmitted } from '~/models/documentModel'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: {
    HistoryDocumentToolBar
  },
  setup (props, context) {
    const ctx = useContext()
    const router = useRouter()
    const dialog = useDialog()
    const route = useRoute()
    const vpSubmitted = useDocumentVpSubmitted()
    const documentVp = useDocumentVps()
    const updateVp = useUpdateVpStatus()
    const checkboxSelectedItems = ref<string[]>([])

    documentVp.setFindLoading()
    vpSubmitted.setLoading()
    onMounted(() => {
      onFetchVPSubmitted(1, '')
      documentVp.find(ctx.params.value['id'])
    })

    const onFetchVPSubmitted = (page: number, q: string) => {
      vpSubmitted.fetch(page, q, { vpId: ctx.params.value['id'] })
    }

    useWatchTrue(() => updateVp.status.value.isError, () => {
      dialog.error({
        title: StringHelper.getError(updateVp.status.value.errorData)
      })
    })

    useWatchTrue(() => updateVp.status.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'เปลี่ยนการใช้งานสำเร็จ',
        description: 'ระบบดำเนินการเปลี่ยนการใช้งานเรียบร้อย'
      }).then(() => {
        documentVp.find(ctx.params.value['id'])
      })
    })

    const tableOptions = useTable({
      repo: vpSubmitted,
      columns: () => [
        {
          value: 'ผู้ส่งเอกสาร'
        },
        {
          value: 'จำนวนเอกสาร'
        },
        {
          value: 'วันที่ส่งเอกสาร'
        },
        {
          value: 'การตรวจสอบ'
        },
        {
          value: 'Tag เอกสาร'
        }
      ],
      rows: () => vpSubmitted.items.value.map((item: IDocumentVpSubmitted): IRow => [
            {
              value: item.holder,
              type: columnType.link,
              props: {
                to: `/documents/${ctx.params.value['id']}/history/${item.id}`
              }
            },
            {
              value: item.document_count
            },
            {
              value: item.created_at,
              type: columnType.date
            },
            {
              value: item.verify ? 'ผ่าน' : 'ไม่ผ่าน'
            },
            {
              value: item.tags || '-'
            }
          ]
      ),
      options: {
        isFlat: false
      }
    })

    const onBackClick = () => {
      if (route.value.query.tab) {
        router.push({
          path: `/documents/?tab=${route.value.query.tab}`
        })
      } else {
        router.push({
          path: `/documents`
        })
      }
    }

    const onToggle = (id: string, status: boolean) => {
      const type: string = status ? 'ACTIVE' : 'INACTIVE'
      updateVp.run(id, type)
    }

    const onDateChange = (data) => {
      vpSubmitted.fetch(1, tableOptions.value.search, {
        ...vpSubmitted.options.value,
        params: data.startDate ? {
          startDate: data.startDate,
          endDate: data.endDate
        } : {}
      })
    }

    const onCancel = (id: string) => {
      dialog.delete({
        title: 'ยืนยันการยกเลิกเอกสาร',
        description: 'เมื่อกดยกเลิกเอกสารจะไม่สามารถแก้ไขได้อีกต้องการส่งยกเลิกเอกสาร ?',
        confirmText: 'ยืนยัน'
      }).then(() => {
        updateVp.run(id, 'CANCEL')
      })
    }

    return {
      tableOptions,
      vpSubmitted,
      onFetchVPSubmitted,
      onBackClick,
      onDateChange,
      onToggle,
      onCancel,
      documentVp
    }
  }
})
</script>

<style lang="scss" scoped></style>
