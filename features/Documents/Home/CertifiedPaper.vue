<template>
  <div class="document-management">
    <Table
        :options="tableOptions().value"
        @pageChange="onFetch">
      <template #toolbar>
        <CertifiedHeader
            @search="onSearch"
            @date="onDateChange"
            @status="onStatusChange"
            @type="onTypeChange">
        </CertifiedHeader>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { columnType, IRow } from '~/components/Table/types'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import TableHeader from '~/components/Table/TableHeader.vue'
import DocumentButton from '~/features/Documents/CreateDocument/DocumentButton.vue'
import CertifiedHeader from '~/features/Documents/Home/CertifiedHeader.vue'
import { useTable } from '~/hooks/table'
import Create from '~/features/Documents/CreateQR/index.vue'
import TableStatus from '~/features/Documents/Home/TableStatus.vue'
import { useDialog } from '~/hooks/dialog'
import { useVC } from '~/loaders/useVC'
import { ArrayHelper } from '~/utils/ArrayHelper'
import { IVCItem } from '~/models/vcModel'
import { StringHelper } from '~/utils/StringHelper'

export default defineComponent({
  components: {
    DocumentButton,
    PrimaryButton,
    TableHeader,
    CertifiedHeader,
    Create
  },
  props: {},
  setup (props, context) {
    const vc = useVC()
    const isShowModal = ref<boolean>(false)
    const step = ref<string>('xl')
    const fetchOptions = ref<any>({ params: {} })
    const dialog = useDialog()
    vc.setLoading()

    onMounted(() => {
      vc.fetch(1, '')
    })

    const tableOptions = () => useTable({
      repo: vc,
      columns: () => [
        {
          value: 'ชื่อเอกสาร'
        },
        {
          value: 'ประเภท Schema'
        },
        {
          value: 'ผู้ลงนามเอกสาร'
        },
        {
          value: 'ผู้รับเอกสาร'
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
      rows: () =>
          ArrayHelper.toArray(vc.items.value).map((item: IVCItem): IRow => {
                return [
                  {
                    value: item.schema_name || item.schema_type || '-',
                    type: columnType.link,
                    props: {
                      to: `/documents/${item.id}/overview`
                    }
                  },
                  {
                    value: item.schema_type
                  },
                  {
                    value: StringHelper.truncate(item.issuer, 20),
                    title: item.issuer
                  },
                  {
                    value: StringHelper.truncate(item.holder, 20),
                    title: item.holder
                  },
                  {
                    value: `${item.creator?.first_name} ${item.creator?.last_name}` || '-'
                  },
                  {
                    value: item.issuance_date,
                    type: columnType.date
                  },
                  {
                    value: item.issuance_date,
                    type: columnType.date
                  },
                  {
                    type: columnType.component,
                    value: TableStatus,
                    props: {
                      status: item.status
                    }
                  }
                ]
              }
          ),
      options: {
        isFlat: true
      }
    })

    const onModalClose = () => {
      isShowModal.value = false
      step.value = 'xl'
    }

    const onFetch = (page: number, q: string) => {
      vc.fetch(page, q, fetchOptions.value)
    }

    const onSearch = (search: string) => {
      fetchOptions.value = {
        ...fetchOptions.value,
        params: {
          ...fetchOptions.value.params,
          q: search
        }
      }

      vc.search(search, fetchOptions.value)
    }

    const onStatusChange = (status: string) => {
      fetchOptions.value = {
        ...fetchOptions.value,
        params: {
          ...fetchOptions.value.params,
          status: status
        }
      }

      vc.fetch(1, fetchOptions.value.params.q || '', fetchOptions.value)
    }

    const onTypeChange = (type: string) => {
      fetchOptions.value = {
        ...fetchOptions.value,
        params: {
          ...fetchOptions.value.params,
          type
        }
      }

      vc.fetch(1, fetchOptions.value.params.q || '', fetchOptions.value)
    }

    const onDateChange = (dates: string[]) => {
      fetchOptions.value = {
        ...fetchOptions.value,
        params: {
          ...fetchOptions.value.params,
          start_date: dates[0],
          end_date: dates[1]
        }
      }

      vc.fetch(1, fetchOptions.value.params.q || '', fetchOptions.value)
    }

    const onStep3 = (index) => {
      if (index === 3) {
        step.value = 'l'
      } else {
        step.value = 'xl'
      }
    }

    return {
      vc,
      tableOptions,
      isShowModal,
      step,
      onFetch,
      onSearch,
      onDateChange,
      onStatusChange,
      onTypeChange,
      onModalClose,
      onStep3
    }
  }
})
</script>

<style lang="scss" scoped></style>
