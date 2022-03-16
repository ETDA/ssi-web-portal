<template>
  <FormWrapper
      class="register-form"
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <div class="set-password-container container py-10 my-4">
      <Card class="set-password-card mx-auto pt-6">
        <div class="logo px-10 mb-4">
          <img class="w-100 px-5" src="/set_password.svg" alt="Set Password">
        </div>
        <h3 class="mb-4 text-primary text-center">ตั้งรหัสผ่าน<br>เพื่อเข้าใช้งานครั้งแรก</h3>
        <Field
            :options="formFields"
            :value="form.values.value"/>
        <SubmitButton
            :isFull="true"
            :isLoading="status.isLoading"
            :isDisabled="failed"
            name="ตั้งรหัสผ่าน"/>
      </Card>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import PrimaryButton from '~/containers/PrimaryButton.vue'
import {IFormOption, INPUT_TYPES} from '~/components/Form/types'
import {useForm} from '~/hooks/form'
import {IStatus} from '~/lib/state/types'

export default defineComponent({
  components: { PrimaryButton },
  props: {
    status: Object as () => IStatus
  },
  setup (props, context) {
    const formName = 'user_verify'
    const form = useForm({ name: formName })

    const formFields: IFormOption[] = [
      {
        type: INPUT_TYPES.PASSWORD,
        className: 'col-12',
        props: {
          label: 'รหัสผ่านใหม่',
          placeholder: 'กรุณาระบุรหัสผ่าน',
          name: 'password',
          rules: 'required|min:8'
        }
      },
      {
        type: INPUT_TYPES.PASSWORD,
        className: 'col-12',
        props: {
          label: 'ยืนยันรหัสผ่านอีกครั้ง',
          placeholder: 'กรุณาระบุรหัสผ่านอีกครั้ง',
          name: 'confirm_password',
          rules: 'required|confirmed:password'
        }
      }
    ]

    return {
      form,
      formFields
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
