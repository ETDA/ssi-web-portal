<template>
  <Overview/>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import Overview from '~/features/Documents/DocumentHistory/index.vue'
import { layouts } from '~/constants/layout'
import { middlewares } from '~/constants/middlewares'

export default defineComponent({
  layout: layouts.default_secondary,
  components: { Overview },
  middleware: middlewares.auth,
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updatePageMeta({
        title: appRepo.menu.document.name,
        breadcrumb: [
          appRepo.menu.home,
          appRepo.menu.document
        ]
      })
      await appRepo.updateDocMeta({
        title: appRepo.menu.document.name
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>

