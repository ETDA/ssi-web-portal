<template>
  <Request/>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import Request from '~/features/Documents/RequestDocument/index.vue'
import { layouts } from '~/constants/layout'
import AppRepository from '~/repositories/AppRepository'
import { middlewares } from '~/constants/middlewares'

export default defineComponent({
  layout: layouts.default_secondary,
  components: { Request },
  middleware: middlewares.auth,
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updatePageMeta({
        title: appRepo.menu.requestDocument.name,
        breadcrumb: [
          appRepo.menu.home,
          appRepo.menu.document,
          appRepo.menu.requestDocument
        ]
      })
      await appRepo.updateDocMeta({
        title: appRepo.menu.requestDocument.name
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
