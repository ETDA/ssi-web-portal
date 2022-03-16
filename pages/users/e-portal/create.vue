<template>
  <PortalUserCreate/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import PortalUserCreate from '~/features/PortalUserCreate/index.vue'
import {middlewares} from '~/constants/middlewares'

export default defineComponent({
  components: {
    PortalUserCreate
  },
  middleware: [middlewares.auth, middlewares.admin],
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: AppRepository.menu().portalUserCreate.name
      })
      await appRepo.updatePageMeta({
        title: AppRepository.menu().portalUserCreate.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().portalUser,
          AppRepository.menu().portalUserCreate,
        ]
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
