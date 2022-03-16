<template>
  <Verify/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import {layouts} from '~/constants/layout'
import AppRepository from '~/repositories/AppRepository'
import {middlewares} from '~/constants/middlewares'
import Verify from '~/features/Authentication/Verify/index.vue'

export default defineComponent({
  components: { Verify },
  middleware: middlewares.notAuth,
  layout: layouts.none,
  setup: function (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: 'หน้าแรก'
      })
      await appRepo.updatePageMeta({
        title: 'หน้าแรก'
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
