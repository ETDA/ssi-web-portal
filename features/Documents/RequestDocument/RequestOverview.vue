<template>
  <div class="request-overview">
    <div class="px-3 mb-3">
      <Card title="ข้อมูลเอกสาร" :isHeaderWhite="true">
        <div class="row">
          <div class="col-2 text-primary font-weight-bold mb-3">ชื่อเอกสาร:</div>
          <div class="col-9 mb-3">{{ form.values.value.name }}</div>
          <div class="col-2 text-primary font-weight-bold mb-3">สร้างโดย:</div>
          <div class="col-9 mb-3">{{ $auth.me.first_name }} {{ $auth.me.last_name }}</div>
          <div class="col-2 text-primary font-weight-bold mb-3">วันที่สร้าง:</div>
          <div class="col-9 mb-3">{{ $time.getDateFormTime($time.getCurrentDateTime()) }}</div>
        </div>
      </Card>
    </div>
    <div class="p-3">
      <h6 class="mb-3">รายการเอกสาร</h6>
      <div
          :key="document.id"
          v-for="(document, index) in form.values.value.documents"
          class="bg-primary-light p-3 rounded mb-3">
        <div class="d-flex justify-content-between mt-2 mb-3">
          <h6 class="text-primary">{{ document.schema_type }}</h6>
        </div>
        <div class="d-flex">
          <div class="label text-primary"><p>เงื่อนไขในการรับเอกสาร:</p></div>
          <div class="value"><p>{{ getRequired(index) }}</p></div>
        </div>
        <div class="d-flex">
          <div class="label text-primary"><p>คำขอเพิ่มเติม:</p></div>
          <div class="value"><p>{{ getAdditional(index) }}</p></div>
        </div>
      </div>
    </div>
    <hr>
    <div class="d-flex justify-content-end pb-3 px-3">
      <SecondaryButton
          @click="$emit('back')"
          className="mr-3"
          name="ย้อนกลับ"/>
      <SubmitButton
          type="button"
          @click="$emit('submit')"
          :isLoading="status.isLoading"
          name="ออกคำร้อง"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IStatus } from '~/lib/state/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import { useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'

interface Props {
  form: any
  status: IStatus
}

export default defineComponent<Props>({
  components: { SecondaryButton },
  props: {
    form: {
      required: true,
      type: Object
    },
    status: {
      required: true,
      type: Object as () => IStatus
    }
  },
  setup (props: Props, context) {
    const getRequired = (index: number): string => {
      const required: boolean = props.form.values.value.documents[index].is_required
      if (required) {
        return 'เอกสารจำเป็น'
      } else {
        return 'เอกสารไม่จำเป็น'
      }
    }
    const getAdditional = (index: number): string => {
      const additional: string = props.form.values.value.documents[index].noted
      if (additional) {
        return additional
      } else {
        return 'ไม่ระบุ'
      }
    }

    const formFieldName = useFormFields([
          {
            type: INPUT_TYPES.TEXT,
            className: 'col-4',
            props: {
              name: `name`,
              label: '',
              placeholder: 'ชื่อเอกสาร',
              rules: 'required'
            }
          }
        ]
    )

    return {
      getRequired,
      getAdditional,
      formFieldName
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
