<template>
  <div class="register">
    <HeaderSecondary
      title="ลงทะเบียนการใช้งาน"/>
    <div class="content py-10">
      <Register/>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import Register from "~/features/Authentication/Register/Register.vue";
import AppRepository from "~/repositories/AppRepository";
import {layouts} from "~/constants/layout";
import Footer from "~/layouts/components/Footer.vue";
import HeaderSecondary from "~/layouts/components/HeaderSecondary.vue";

interface Props {
}

export default defineComponent<Props>({
  components: {HeaderSecondary, Footer, Register},
  layout: layouts.none,
  props: {},
  setup(props: Props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: 'สมัครสมาชิก',
      })
      await appRepo.updatePageMeta({
        title: 'สมัครสมาชิก',
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
