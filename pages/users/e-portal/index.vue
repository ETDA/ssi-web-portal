<template>
  <UsersPortal/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import UsersPortal from '~/features/PortalUsers/index.vue'
import {middlewares} from '~/constants/middlewares'

export default defineComponent({
  components: {
    UsersPortal
  },
  middleware: [middlewares.auth, middlewares.admin],
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: AppRepository.menu().portalUser.name
      })
      await appRepo.updatePageMeta({
        title: AppRepository.menu().portalUser.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().portalUser
        ]
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
