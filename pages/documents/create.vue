<template>
  <Create/>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import Create from '~/features/DocumentCreate/index.vue'
import AppRepository from '~/repositories/AppRepository'
import { layouts } from '~/constants/layout'
import { middlewares } from '~/constants/middlewares'

export default defineComponent({
  layout: layouts.default_secondary,
  components: { Create },
  middleware: middlewares.auth,
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updatePageMeta({
        title: appRepo.menu.createDocument.name,
        breadcrumb: [
          appRepo.menu.home,
          appRepo.menu.document,
          appRepo.menu.createDocument
        ]
      })
      await appRepo.updateDocMeta({
        title: appRepo.menu.createDocument.name
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
