<template>
  <div class="set-password-success-container container py-10 my-4">
    <Card class="set-password-card mx-auto pt-6">
      <div class="logo px-10 mb-6">
        <img class="w-100 px-5" src="/set_password_success.svg" alt="Set Password Success">
      </div>
      <h3 class="mb-4 text-primary text-center">ตั้งรหัสผ่านสำเร็จ</h3>
      <p class="mb-4 text-center">การลงทะเบียนเสร็จสิ้น กรุณาเข้าสู่ระบบ</p>
      <PrimaryButton
          @click="onClick"
          name="เข้าสู่ระบบ"/>
    </Card>
  </div>
</template>

<script lang="ts">
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import PrimaryButton from '~/containers/PrimaryButton.vue'

export default defineComponent({
  components: { PrimaryButton },
  props: {},
  setup (props, context) {
    const router = useRouter()
    const onClick = () => {
      router.push({ path: '/login' })
    }

    return {
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
