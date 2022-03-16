<template>
  <Detail/>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import { layouts } from '~/constants/layout'
import { middlewares } from '~/constants/middlewares'
import Detail from '~/features/Documents/DocumentHistory/HistoryDetail/index.vue'

export default defineComponent({
  layout: layouts.default_secondary,
  components: { Detail },
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

