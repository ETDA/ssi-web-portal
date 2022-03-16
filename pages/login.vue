<template>
  <Login/>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext, useFetch } from '@nuxtjs/composition-api'
import {layouts} from '~/constants/layout'
import AppRepository from '~/repositories/AppRepository'
import Login from '~/features/Authentication/Login/Login.vue'
import {middlewares} from '~/constants/middlewares'

export default defineComponent({
  components: { Login },
  layout: layouts.none,
  middleware: middlewares.notAuth,
  setup: function (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: 'เข้าสู่ระบบ'
      })
      await appRepo.updatePageMeta({
        title: 'เข้าสู่ระบบ'
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
