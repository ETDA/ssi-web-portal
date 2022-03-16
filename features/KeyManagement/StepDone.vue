<template>
  <div class="col-4 mx-auto">
    <Card class="set-password-card mx-auto pt-6">
      <div class="logo px-10 mb-6">
        <img class="w-100 px-5" src="/success-icon.png" style="width: 150px">
      </div>
      <h3 class="text-primary text-center">ตั้งค่า Key สำเร็จ</h3>
      <p class="text-center">ระบบการตั้งค่า Key สำเร็จ</p>
      <p class="mb-4 text-center">DID ของคุณคือ</p>
      <div class="p-2 rounded mb-6" style="background-color: #F2F2F2">
        <p class="text-black font-weight-bold text-center">หมายเลข DID : <span
            class="text-secondary" :title="did">{{ $string.getShortDID(did) }}</span></p>
      </div>
      <nuxt-link class="btn btn-primary btn-block py-3" to="/">เข้าใช้งาน e-Portal</nuxt-link>
    </Card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    did: {
      required: true,
      type: String
    }
  },
  setup (props, context) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
