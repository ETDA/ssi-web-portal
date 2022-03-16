<template>
  <Card title="อัปโหลด Key" bodyClassName="p-0">
    <h4 class="font-weight-bold text-primary p-4">รายการนำส่งเอกสาร</h4>
    <TableEasy :options="tableOptions"/>
    <hr class="mt-10">
    <div class="d-flex justify-content-end my-4 px-3">
      <SecondaryButton
          @click="onCancel"
          className="mr-3"
          name="ย้อนกลับ"/>
      <SubmitButton
          type="button"
          @click="onSubmit"
          :isLoading="status.isLoading"
          :isDisabled="!isShowSubmitButton"
          name="ยืนยันการส่ง"/>
    </div>
  </Card>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { columnType } from '~/components/Table/types'
import FileInputButton from '~/features/KeyManagement/FileInputButton.vue'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import { IStatus } from '~/lib/state/types'
import { ref } from '@vue/composition-api'
import { TimeHelper } from '~/utils/TimeHelper'
import { StepKey } from '~/features/KeyManagement/types'
import { _clone } from '~/utils/lodash'

export default defineComponent({
  components: { SecondaryButton },
  props: {
    status: {
      required: true,
      type: Object as () => IStatus
    }
  },
  setup (props, context) {
    const files = ref<any[]>([
      {
        name: '<b>x.509 Certificate</b>',
        value: ''
      },
      {
        name: '<b>x.509 Key</b>',
        value: ''
      }
    ])
    const tableOptions = computed(() => ({
      primary: 'id',
      columns: [
        {
          value: 'ชื่อไฟล์'
        },
        {
          value: 'วันที่นำส่ง'
        },
        {
          value: ''
        }
      ],
      rows: files.value.map((item, i) => ([
        {
          value: item.name
        },
        {
          value: item.value ? TimeHelper.getDateFormTime(TimeHelper.getCurrentDate()) : '-'
        },
        {
          value: FileInputButton,
          type: columnType.component,
          props: {
            onChange: (result: { value: string, file: File }) => {
              const temp = _clone(files.value)
              temp[i].value = result.value
              files.value = temp
            }
          }
        }
      ]))
    }))

    const onCancel = () => {
      context.emit('input', StepKey.Start)
    }

    const isShowSubmitButton = computed(() => {
      let isShow = true
      files.value.forEach((item) => {
        if (!item.value) {
          isShow = false
          return
        }
      })

      return isShow
    })

    const onSubmit = () => {
      context.emit('submit', files.value)
    }
    return { tableOptions, onCancel, isShowSubmitButton, files, onSubmit }
  }
})
</script>

<style lang="scss" scoped>
</style>
