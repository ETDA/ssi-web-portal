<template>
  <Home/>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { layouts } from '~/constants/layout'
import Home from '~/features/Home/Home.vue'
import AppRepository from '~/repositories/AppRepository'
import { middlewares } from '~/constants/middlewares'

export default defineComponent({
  components: { Home },
  middleware: middlewares.auth,
  layout: layouts.blank,
  setup: function (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: appRepo.menu.home.name
      })
      await appRepo.updatePageMeta({
        title: appRepo.menu.home.name
      })
    })

  }
})
</script>

<style lang="scss" scoped>
</style>
