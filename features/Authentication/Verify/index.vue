<template>
  <div class="set-password">
    <HeaderSecondary
        title="ลงทะเบียนการใช้งาน"/>
    <div class="content py-10">
      <Loading :isLoading="!verify.status.value.isLoaded">
        <SetPasswordConfirm
            :status="setPassword.status.value"
            @submit="onSubmit"
            v-if="step === SetPasswordStep.Confirm"/>
        <SetPasswordSuccess
            v-else-if="step === SetPasswordStep.Success"/>
      </Loading>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, useContext, useRouter} from '@nuxtjs/composition-api'
import HeaderSecondary from '~/layouts/components/HeaderSecondary.vue'
import {useUserVerifyGet, useUserVerifyPost} from '~/loaders/useUserVerify'
import {useWatchTrue} from '~/hooks/watch'
import {ref} from '@vue/composition-api'
import SetPasswordSuccess from '~/features/Authentication/Verify/SetPasswordSuccess.vue'
import SetPasswordConfirm from '~/features/Authentication/Verify/SetPasswordConfirm.vue'

enum SetPasswordStep {
  Confirm,
  Success,
}

export default defineComponent({
  components: {
    HeaderSecondary,
    SetPasswordSuccess, SetPasswordConfirm
  },
  setup (props, context) {
    const ctx = useContext()
    const router = useRouter()
    const verify = useUserVerifyGet()
    const setPassword = useUserVerifyPost()
    const step = ref<SetPasswordStep>(SetPasswordStep.Confirm)

    onMounted(() => {
      verify.run(ctx.params.value['token'])
    })

    useWatchTrue(() => verify.status.value.isError, () => {
      router.push({ path: '/login' })
    })

    useWatchTrue(() => setPassword.status.value.isSuccess, () => {
      step.value = SetPasswordStep.Success
    })

    const onSubmit = (data: any) => {
      setPassword.run(ctx.params.value['token'], data.password)
    }

    return {
      verify,
      step,
      SetPasswordStep,
      setPassword,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
