<template>
  <FormWrapper
      @submit.prevent="form.validate(submit)"
      ref="form"
      v-slot="{ failed }">
    <h5 class="text-primary font-base">
      ข้อมูลความปลอดภัย
    </h5>
    <hr class="w-100 my-4">
    <div class="d-flex">
      <i class="tio-key text-xl text-primary mr-2"/>
      <h6 class="text-primary font-base">
        เปลี่ยนรหัสผ่าน
      </h6>
    </div>
    <p class="py-3">
      เมื่อคุณทำการเปลี่ยนรหัสผ่านของบัญชีผู้ใช้งาน ระบบจะดำเนินการออกจากระบบอัตโนมัติ
      หลังจากนั้นคุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่
    </p>
    <Field
        :options="formFields"
        :value="form.values.value"/>
    <SubmitButton
        class="mt-3 px-6"
        :isLoading="auth.changePasswordStatus.isLoading"
        :isDisabled="failed || auth.changePasswordStatus.isLoading"
        name="เปลี่ยนรหัสผ่าน"/>
  </FormWrapper>
</template>

<script lang="ts">
import {defineComponent, useContext, useRouter} from '@nuxtjs/composition-api'
import {useForm, useFormFields} from '~/hooks/form'
import {INPUT_TYPES} from '~/components/Form/types'
import AuthRepository from '~/repositories/AuthRepository'
import {useDialog} from '~/hooks/dialog'
import {useWatchTrue} from '~/hooks/watch'
import {useCookies} from '~/hooks/app'

export default defineComponent({
  props: {},
  setup (props, context) {
    const form = useForm({ name: 'change_password' })
    const auth = new AuthRepository(useContext())
    const dialog = useDialog()
    const cookie = useCookies()
    const router = useRouter()

    const formFields = useFormFields([
      {
        type: INPUT_TYPES.PASSWORD,
        className: 'col-7',
        props: {
          label: 'รหัสผ่านเดิม',
          name: 'old_password',
          rules: 'required'
        }
      },
      {
        type: INPUT_TYPES.PASSWORD,
        className: 'col-7',
        props: {
          label: 'รหัสผ่านใหม่',
          name: 'new_password',
          rules: 'required'
        }
      },
      {
        type: INPUT_TYPES.PASSWORD,
        className: 'col-7',
        props: {
          label: 'ยืนยันรหัสผ่านอีกครั้ง',
          name: 'confirm_password',
          rules: 'required|confirmed:new_password'
        }
      }
    ])

    const submit = (data: { old_password: string, new_password: string }) => {
      auth.changePassword(data.old_password, data.new_password)
    }

    useWatchTrue(() => auth.changePasswordStatus.isSuccess, () => {
      dialog.confirm({
        title: 'เปลี่ยนรหัสผ่านใหม่สำเร็จ',
        description: 'ระบบกำลังนำคุณไปยังการเข้าสู่ระบบใหม่'
      }).then(async () => {
        await auth.logout()
        await cookie.set('me', null)
        router.push({
          path: '/login'
        })
      })
    })

    useWatchTrue(() => auth.changePasswordStatus.isError, () => {
      dialog.error({
        title: 'เปลี่ยนรหัสผ่านใหม่ไม่สำเร็จ'
      })
    })

    return {
      form,
      auth,
      submit,
      formFields
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
