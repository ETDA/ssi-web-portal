<template>
  <div class="ownership-modal d-flex flex-column">
    <div class="d-flex align-items-center">
      <h6 class="text-primary">ผู้รับเอกสารรับรอง:</h6>
      <p class="pl-3 mt-1">{{ name }}</p>
    </div>
    <div class="pt-3"/>
    <h4 class="text-primary">เลือกเอกสารรับรอง</h4>
    <div class="pt-3"/>
    <Table
        :options="tableOptions"
        @search="onSearch"
        @pageChange="onFetch">
    </Table>
    <div class="pt-3"/>
    <div class="d-flex justify-content-end align-items-center">
      <div class="d-flex justify-content-between" style="min-width: 250px;">
        <SecondaryButton @click="$emit('back')" name="ย้อนกลับ"/>
        <SubmitButton
            @click="onSubmit"
            type="button"
            name="เลือก"
            :isDisabled="$array.isEmpty(cidSelectItems)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import Step from '~/features/DocumentCreate/Step.vue'
import { useTable } from '~/hooks/table'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import { ArrayHelper } from '~/utils/ArrayHelper'
import TableCheckBox from '~/features/WalletUsers/TableCheckBox.vue'
import TableColumnActions from '~/features/Documents/CreateQR/TableColumnActions.vue'
import { columnType, IRow } from '~/components/Table/types'
import { useVCByDID } from '~/loaders/useVC'
import { IVCItem } from '~/models/vcModel'

export default defineComponent({
  components: { Step, SecondaryButton, PrimaryButton },
  props: {
    name: {
      type: String
    },
    did: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    const cidSelectItems = ref<string[]>([])
    const vc = useVCByDID()
    vc.setLoading()

    onMounted(() => {
      onFetch()
    })

    const onFetch = (page: number = 1, q: string = '') => {
      vc.fetch(page, q, { did: props.did })
    }

    const onSearch = (q: string = '') => {
      onFetch(1, q)
    }
    const tableOptions = useTable({
      repo: vc,
      columns: () => [
        {
          value: TableColumnActions,
          isComponent: true,
          props: {
            checked: vc.items.value.length === cidSelectItems.value.length && !ArrayHelper.isEmpty(vc.items.value),
            isShowAction: !ArrayHelper.isEmpty(cidSelectItems.value),
            onCheckAll: (checked: boolean) => {
              if (checked) {
                cidSelectItems.value = vc.items.value.map((v: IVCItem) => v.cid)
              } else {
                cidSelectItems.value = []
              }
            }
          }
        },
        {
          value: 'ชื่อเอกสาร'
        },
        {
          value: 'ประเภท Schema'
        },
        {
          value: 'วันที่สร้าง'
        },
        {
          value: 'ผู้รับรองเอกสาร'
        }
      ],
      rows: () =>
          vc.items.value.map((item: IVCItem): IRow => [
                {
                  type: columnType.component,
                  className: 'd-flex justify-content-center',
                  value: TableCheckBox,
                  props: {
                    isHide: item.status !== 'ACTIVE',
                    item: item,
                    checked: ArrayHelper.isExist(cidSelectItems.value, item.cid),
                    onChange: (checked: boolean) => {
                      if (checked) {
                        cidSelectItems.value = [
                          ...cidSelectItems.value,
                          item.cid
                        ]
                      } else {
                        cidSelectItems.value = cidSelectItems.value.filter((cid) => cid !== item.cid)
                      }
                    }
                  }
                },
                {
                  value: item.schema_name
                },
                {
                  value: item.schema_type
                },
                {
                  value: item.issuance_date,
                  type: columnType.date
                },
                {
                  value: item.issuer
                }
              ]
          ),
      options: {
        isFlat: false,
        isHideToolbar: true
      }
    })

    const onSubmit = () => {
      context.emit('submit', cidSelectItems.value)
    }

    return {
      vc,
      tableOptions,
      cidSelectItems,
      onSubmit,
      onSearch,
      onFetch
    }
  }
})
</script>

<style lang="scss" scoped></style>
