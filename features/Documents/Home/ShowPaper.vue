<template>
  <div class="document-management">
    <Table
        :options="tableOptions"
        @pageChange="onFetch">
      <template #toolbar>
        <div class="col-6">
          <ShowPaperHeader @search="onSearch" @date="onDateChange"/>
        </div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { columnType, IRow } from '~/components/Table/types'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import TableHeader from '~/components/Table/TableHeader.vue'
import DocumentButton from '~/features/Documents/CreateDocument/DocumentButton.vue'
import { IDocumentVpItem } from '~/models/documentModel'
import { useCancelVp, useDocumentVps, useUpdateVpStatus } from '~/loaders/useDocument'
import { useTable } from '~/hooks/table'
import TableShow from '~/features/Documents/Home/TableShow.vue'
import ShowPaperHeader from '~/features/Documents/Home/ShowPaperHeader.vue'
import TableFolderIcon from '~/features/Documents/Home/TableFolderIcon.vue'
import TableCheckBox from '~/features/WalletUsers/TableCheckBox.vue'
import TableColumnCheckBox from '~/features/Documents/Home/TableColumnCheckBox.vue'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { ParamHelper } from '~/utils/ParamHelper'
import { DialogConfirmIconType, useDialog } from '~/hooks/dialog'
import { _set } from '~/utils/lodash'
import { useWatchTrue } from '~/hooks/watch'

export default defineComponent({
  components: { DocumentButton, PrimaryButton, TableHeader, ShowPaperHeader },
  setup (props, context) {
    const checkboxSelectedItems = ref<string[]>([])
    const document = useDocumentVps()
    const fetchOptions = ref({})
    const dialog = useDialog()
    const vpStatus = useUpdateVpStatus()
    const cancelVps = useCancelVp()

    onMounted(() => {
      document.fetch(1, '')
    })

    const tableOptions = useTable({
      repo: document,
      columns: () => [
        {
          value: TableColumnCheckBox,
          isComponent: true,
          props: {
            checked:
                document.items.value.length ==
                checkboxSelectedItems.value.length &&
                !ArrayHelper.isEmpty(document.items.value),
            isShowAction: !ArrayHelper.isEmpty(checkboxSelectedItems.value),
            onCheckAll: (checked: boolean) => {
              if (checked) {
                checkboxSelectedItems.value = document.items.value.map((item) => item.id)
              } else {
                checkboxSelectedItems.value = []
              }
            },
            onDelete: () => {
              dialog.delete({
                title: 'ยืนยันการยกเลิกเอกสาร',
                description: 'เมื่อกดยกเลิกเอกสารจะไม่สามารถแก้ไขได้อีกต้องการส่งยกเลิกเอกสาร ?',
                confirmText: 'ยืนยัน'
              }).then(() => {
                cancelVps.run(checkboxSelectedItems.value)
              })
            }
          }
        },
        {
          value: 'ชื่อเอกสาร'
        },
        {
          value: 'จำนวนเอกสาร'
        },
        {
          value: 'สร้างโดย'
        },
        {
          value: 'วันที่สร้างเอกสาร'
        },
        {
          value: 'วันที่แก้ไขล่าสุด'
        },
        {
          value: 'สถานะการใช้งาน'
        }
      ],
      rows: () => document.items.value.map((item: IDocumentVpItem): IRow => [{
            type: columnType.component,
            className: 'd-flex justify-content-center',
            value: TableCheckBox,
            props: {
              item: item,
              isHide: item.status !== 'ACTIVE',
              checked: ParamHelper.getBoolFalse(checkboxSelectedItems.value.find((id) => id === item.id)),
              onChange: (checked: boolean) => {
                if (checked) {
                  checkboxSelectedItems.value = [
                    ...checkboxSelectedItems.value,
                    item.id
                  ]
                } else {
                  checkboxSelectedItems.value = checkboxSelectedItems.value.filter((id) => id !== item.id)
                }
              }
            }
          },
            {
              type: columnType.component,
              value: TableFolderIcon,
              props: {
                document_name: item.name,
                to: `/documents/${item.id}/history`
              }
            },
            {
              value: item.submitted_count
            },
            {
              value: `${item.creator.first_name} ${item.creator.last_name}`
            },
            {
              value: item.created_at,
              type: columnType.date
            },
            {
              value: item.updated_at,
              type: columnType.date
            },
            {
              type: columnType.component,
              value: TableShow,
              props: {
                status: item.status,
                isShowAction: item.status === 'ACTIVE',
                onDelete: () => {
                  dialog.delete({
                    title: 'ยืนยันการยกเลิกเอกสาร',
                    description: 'เมื่อกดยกเลิกเอกสารจะไม่สามารถแก้ไขได้อีกต้องการส่งยกเลิกเอกสาร ?',
                    confirmText: 'ยืนยัน'
                  }).then(() => {
                    vpStatus.run(item.id, 'CANCEL')
                  })
                }
              }
            }
          ]
      ),
      options: {
        isFlat: true
      }
    })

    useWatchTrue(() => vpStatus.status.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'เปลี่ยนการใช้งานสำเร็จ',
        description: 'ระบบดำเนินการเปลี่ยนการใช้งานเรียบร้อย'
      })
      onFetch(document.options.value.currentPage || 1, document.options.value.search || '')
    })

    useWatchTrue(() => cancelVps.status.value.isSuccess, () => {
      dialog.confirm({
        icon: DialogConfirmIconType.SUCCESS,
        title: 'เปลี่ยนการใช้งานสำเร็จ',
        description: 'ระบบดำเนินการเปลี่ยนการใช้งานเรียบร้อย'
      })
      checkboxSelectedItems.value = []
      onFetch(document.options.value.currentPage || 1, document.options.value.search || '')
    })

    const onFetch = (page: number, q: string) => {
      document.fetch(page, q, document.options.value)
    }

    const onSearch = (search: string) => {
      document.search(search, fetchOptions.value)
    }

    const onDateChange = (data: string[]) => {
      _set(document.options.value, 'params', {
        start_date: data[0],
        end_date: data[1]
      })

      document.fetch(1, tableOptions.value.search, document.options.value)
    }

    return {
      tableOptions,
      onSearch,
      onDateChange,
      document,
      onFetch,
      checkboxSelectedItems
    }
  }
})
</script>

<style lang="scss" scoped></style>
