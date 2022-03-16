<template>
  <div class="login-page position-relative">
    <img class="authen-background position-absolute top-0 left-0 h-100 w-100" src="/authen_background.png"
         alt="Authentication Background">
    <div
        class="login-container h-100 container d-flex justify-content-center align-items-center position-absolute top-0">
      <div class="logo">
        <h1 class="text-white mb-1">ระบบจัดการเอกสาร</h1>
        <img src="/logo_big.png" alt="ETDA">
      </div>
      <div class="split h-100 d-flex justify-content-center">
        <div class="bg-white h-100" style="width: 1px;"></div>
      </div>
      <FormWrapper
          class="login-form d-md-flex justify-content-md-center"
          @submit.prevent="validate(onLogin)"
          ref="form"
          v-slot="{ failed }">
        <Card class="login-card mx-auto mx-md-0">
          <h3 class="text-center py-4">เข้าสู่ระบบ</h3>
          <Field
              :options="formFields"
              :value="values"/>
          <SubmitButton
              class="mt-3"
              :isFull="true"
              :isLoading="$auth.loginStatus.isLoading"
              :isDisabled="failed"
              name="เข้าสู่ระบบ"/>
          <!--          <div class="d-flex justify-content-between">
                      <NuxtLink to="#" class="d-block pt-4 pb-2 text-dark">ลืมรหัสผ่านหรือไม่ ?</NuxtLink>
                      <NuxtLink to="/register" class="d-block pt-4 pb-2 text-dark">สร้างบัญชีที่นี่ <i
                          class="tio-arrow-right-circle"/></NuxtLink>
                    </div>-->
        </Card>
      </FormWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, useContext, useRouter} from '@nuxtjs/composition-api'
import {useForm} from '~/hooks/form'
import {IFormOption, INPUT_TYPES} from '~/components/Form/types'
import AuthRepository from '~/repositories/AuthRepository'
import {useWatchTrue} from '~/hooks/watch'
import {useDialog} from '~/hooks/dialog'

interface Props {
}

export default defineComponent<Props>({
  props: {},
  setup (props: Props, context) {
    const router = useRouter()
    const ctx = useContext()
    const form = useForm({ name: 'login' })
    const auth = new AuthRepository(ctx)
    const dialog = useDialog()

    const formFields: IFormOption[] = [
      {
        type: INPUT_TYPES.TEXT,
        className: 'col-12',
        props: {
          label: 'อีเมล',
          placeholder: 'กรุณาระบุอีเมล',
          name: 'email',
          rules: 'required|email'
        }
      },
      {
        type: INPUT_TYPES.PASSWORD,
        className: 'col-12',
        props: {
          label: 'รหัสผ่าน',
          placeholder: 'กรุณาระบุรหัสผ่าน',
          name: 'password',
          rules: 'required'
        }
      }
    ]

    const onLogin = (data: any) => {
      auth.login(data.email, data.password)
    }

    useWatchTrue(() => auth.loginStatus.isSuccess, () => {
      router.push({
        path: `/`
      })
    })

    useWatchTrue(() => auth.loginStatus.isError, () => {
      dialog.error({
        title: 'อีเมลหรือรหัสผ่าน ไม่ถูกต้อง'
      })
    })

    return {
      ...form,
      formFields,
      onLogin
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
