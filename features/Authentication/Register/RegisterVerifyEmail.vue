<template>
  <div class="register-verify-email container py-10 my-4">
    <Card class="register-card mx-auto pt-6">
      <div class="logo px-10 mb-4">
        <img class="w-100 px-5" src="/register_email.svg" alt="Email">
      </div>
      <h3 class="mb-4 text-primary text-center">ยืนยันการลงทะเบียนผ่านอีเมล</h3>
      <p class="text-center mb-4">
        กรุณาตรวจสอบอีเมลของคุณ จากนั้นคลิกลิงก์ที่ได้รับจากอีเมล
        เพื่อเป็นการยืนยันการลงทะเบียน และตั้งรหัสผ่านบัญชีผู้ใช้งาน
      </p>
      <p class="text-center mb-6">
        *หากคุณไม่ได้รับอีเมล กรุณากด <a href="#">ส่งอีเมลอีกครั้ง</a>
      </p>
      <PrimaryButton
          @click="onClick"
          name="เข้าสู่ระบบ"/>
    </Card>
  </div>
</template>

<script lang="ts">
import {defineComponent, useRouter} from '@nuxtjs/composition-api'
import PrimaryButton from "~/containers/PrimaryButton.vue";

interface Props {
}

export default defineComponent<Props>({
  components: {PrimaryButton},
  props: {},
  setup(props: Props, context) {
    const router = useRouter()

    const onClick = () => {
      router.push({
        path: '/login'
      })
    }

    return {
      onClick,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
