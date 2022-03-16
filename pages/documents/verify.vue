<template>
  <Verify/>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import { layouts } from '~/constants/layout'
import { middlewares } from '~/constants/middlewares'
import Verify from '~/features/Documents/VerifyDocument/index.vue'

interface Props {
}

export default defineComponent<Props>({
  layout: layouts.default_secondary,
  components: { Verify },
  props: {},
  middleware: middlewares.auth,
  setup (props: Props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updatePageMeta({
        title: appRepo.menu.verifyDocument.name,
        breadcrumb: [
          appRepo.menu.home,
          appRepo.menu.document,
          appRepo.menu.verifyDocument
        ]
      })
      await appRepo.updateDocMeta({
        title: appRepo.menu.verifyDocument.name
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
