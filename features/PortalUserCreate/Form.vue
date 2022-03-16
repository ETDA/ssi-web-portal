<template>
  <FormWrapper
      @submit.prevent="form.validate(form.emitSubmit)"
      ref="form"
      v-slot="{ failed }">
    <div class="d-flex justify-content-between p-3">
      <Field
          :error="error"
          :options="formFields"
          :value="form.values.value"/>
      <div style="padding: 50px">
        <img src="/user-group.png" class="w-100" style="max-width: 400px" alt="">
      </div>
    </div>
    <hr>
    <div class="d-flex justify-content-end align-items-center p-3">
      <SecondaryButton
          @click="onCancel"
          className="mr-3"
          name="ยกเลิก"/>
      <SubmitButton
          :isDisabled="failed"
          :isLoading="status.isLoading"
          name="เพิ่ม"/>
    </div>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import {ICreateDocumentForm} from '~/features/Documents/CreateDocument/FormCreateDocumentHelper'
import {INPUT_TYPES} from '~/components/Form/types'
import SecondaryButton from '~/containers/SecondaryButton.vue'
import {IStatus} from '~/lib/state/types'
import {userRoles} from '~/constants/user_role'
import {TimeHelper} from '~/utils/TimeHelper'

export default defineComponent({
  components: {
    SecondaryButton
  },
  props: {
    status: Object as () => IStatus,
    error: Object as () => any
  },
  setup (props, context) {
    const router = useRouter()
    const form = useForm<ICreateDocumentForm>({ name: 'user_portal_create' })
    const formFields = useFormFields([
      {
        type: INPUT_TYPES.TEXT,
        props: {
          placeholder: 'กรุณาระบุชื่อจริง',
          label: 'ชื่อ',
          name: 'first_name',
          rules: 'required'
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        props: {
          placeholder: 'กรุณาระบุนามสกุล',
          label: 'นามสกุล',
          name: 'last_name',
          rules: 'required'
        }
      },
      {
        type: INPUT_TYPES.DATE,
        props: {
          placeholder: 'กรุณาระบุวันเดือนปีเกิด',
          label: 'วัน/เดือน/ปีเกิด',
          name: 'date_of_birth',
          rules: 'required',
          max: TimeHelper.getCurrentDate()
        }
      },
      {
        type: INPUT_TYPES.TEXT,
        props: {
          placeholder: 'กรุณาระบุอีเมล(ต.ย. example@mail.com)',
          label: 'อีเมล',
          name: 'email',
          rules: 'required|email'
        }
      },
      {
        type: INPUT_TYPES.RADIO_BUTTON,
        props: {
          placeholder: 'กรุณาระบุชื่อจริง',
          label: 'Role',
          name: 'role',
          rules: 'required',
          defaultValue: 'ADMIN',
          options: userRoles
        }
      }
    ])

    const onCancel = () => {
      router.push({
        path: '/users/e-portal'
      })
    }
    return { form, formFields, onCancel }
  }
})
</script>

<style lang="scss" scoped>
</style>
