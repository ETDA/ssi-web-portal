<template>
  <FormWrapper
      class="document-management-form"
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <div class="d-flex justify-content-between">
      <div>
        <p class="text-primary font-weight-bold">Decentralized identifier(DID):</p>
        <p>{{ user.findItem.value.did }}</p>
        <p class="text-primary mt-3 font-weight-bold">ชื่อ:</p>
        <p>{{ user.findItem.value.name }}</p>
        <p class="text-primary mt-3 font-weight-bold">นามสกุล:</p>
        <p>{{ user.findItem.value.name }}</p>
        <p class="text-primary mt-3 font-weight-bold mb-1">จัดกลุ่ม:</p>
        <div style="width: 248px">
          <Field
              :options="formFields"
              :value="form.values.value"/>
        </div>
      </div>
      <div style="padding: 50px">
        <img src="/user-group.png" class="w-100" style="max-width: 400px" alt="">
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <SubmitButton
          class="mt-3"
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
import {IUsePageLoader} from '~/hooks/loaderPage'
import {ObjectHelper} from '~/utils/ObjectHelper'
import {IUserWalletItem} from '~/models/userWalletModel'

export default defineComponent({
  props: {
    user: Object as () => IUsePageLoader<IUserWalletItem>
  },
  setup (props, context) {
    const form = useForm<ICreateDocumentForm>({ name: 'user_wallet_update' })
    const formFields = useFormFields([
      {
        type: INPUT_TYPES.MULTI_SELECT,
        props: {
          placeholder: 'เลือกกลุ่ม',
          name: 'group',
          options: [
            ObjectHelper.createOption('fsdafa', 'fasdfs'),
            ObjectHelper.createOption('fsdafa1', 'fasdfs1'),
            ObjectHelper.createOption('fsdafa2', 'fasdfs2'),
            ObjectHelper.createOption('fsdafa3', 'fasdfs3'),
            ObjectHelper.createOption('fsdafa4', 'fasdfs4')
          ]
        }
      }
    ])

    return { form, formFields }
  }
})
</script>

<style lang="scss" scoped>
</style>
