<template>
  <KeyManagement/>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import HeaderSecondary from '~/layouts/components/HeaderSecondary.vue'
import KeyManagement from '~/features/KeyManagement/index.vue'
import { layouts } from '~/constants/layout'
import { middlewares } from '~/constants/middlewares'
import { Context } from '@nuxt/types'

export default defineComponent({
  components: { HeaderSecondary, KeyManagement },
  layout: layouts.none,
  middleware: [middlewares.auth, middlewares.admin],
  validate (ctx: Context): Promise<boolean> | boolean {
    if (ctx.app.$auth.me.organization?.did_address) {
      ctx.redirect('/')
    }

    return true
  },
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: appRepo.menu.keySetting.name
      })
      await appRepo.updatePageMeta({
        title: appRepo.menu.keySetting.name
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
