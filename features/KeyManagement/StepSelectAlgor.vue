<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <Card title="Generate Key">
      <div class="p-5">
        <h5 class="font-weight-bold text-primary mb-4">เลือกอัลกอริทึมในการสร้าง Key</h5>
        <Field
            :options="formFields"
            :value="form.values.value"/>
      </div>
      <hr>
      <div class="d-flex justify-content-end my-3">
        <SecondaryButton
            @click="onCancel"
            className="mr-3"
            name="ย้อนกลับ"/>
        <SubmitButton
            :isLoading="status.isLoading"
            :isDisabled="!form.values.value.algor"
            name="สร้าง Key"/>
      </div>
    </Card>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import { useForm, useFormFields } from '~/hooks/form'
import { INPUT_TYPES } from '~/components/Form/types'
import { ObjectHelper } from '~/utils/ObjectHelper'
import { StepKey } from '~/features/KeyManagement/types'
import { IStatus } from '~/lib/state/types'

export default defineComponent({
  components: {
    SecondaryButton
  },
  props: {
    status: {
      required: true,
      type: Object as () => IStatus
    }
  },
  setup (props, context) {
    const form = useForm<any>({ name: 'key_select_algor' })
    const formFields = useFormFields([
      {
        type: INPUT_TYPES.RADIO_BUTTON,
        props: {
          label: '',
          name: 'algor',
          rules: 'required',
          options: [
            ObjectHelper.createOption('ECDSA', 'ECDSA'),
            ObjectHelper.createOption('RSA', 'RSA')
          ]
        }
      }
    ])

    const onCancel = () => {
      context.emit('input', StepKey.Start)
    }

    return { formFields, form, onCancel }
  }
})
</script>

<style lang="scss" scoped>
</style>
