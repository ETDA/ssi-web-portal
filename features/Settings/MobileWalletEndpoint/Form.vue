<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <Field
        :options="formFields"
        :value="form.values.value"/>
    <hr>
    <div class="d-flex justify-content-end">
      <SubmitButton
          :isLoading="status.isLoading"
          :isDisabled="failed"
          name="บันทึก"/>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import {ICreateDocumentForm} from '~/features/Documents/CreateDocument/FormCreateDocumentHelper'
import {INPUT_TYPES} from '~/components/Form/types'
import {IStatus} from '~/lib/state/types'
import {IWalletConfig} from '~/models/configModel'

export default defineComponent({
  props: {
    status: Object as () => IStatus,
    item: Object as () => IWalletConfig
  },
  setup (props, context) {
    const form = useForm<ICreateDocumentForm>({ name: 'user_wallet_update' })
    if (props.item) {
      form.init(props.item)
    }
    const formFields = useFormFields([
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-md-4',
        props: {
          placeholder: 'กรุณาระบุ Wallet Endpoint URL',
          name: 'endpoint',
          rules: 'required|url',
          label: 'Endpoint URL'
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-md-4',
        props: {
          placeholder: 'กรุณาระบุ Access Key',
          name: 'access_token',
          rules: 'required',
          label: 'Access Key'
        }
      }
    ])
    return { form, formFields }
  }
})
</script>

<style lang="scss" scoped>
</style>
