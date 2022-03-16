<template>
  <Settings/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext} from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import Settings from '~/features/Settings/index.vue'
import {middlewares} from '~/constants/middlewares'

export default defineComponent({
  middleware: middlewares.auth,
  components: { Settings },
  setup (props, context) {
    const appRepo = new AppRepository(useContext())
    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: AppRepository.menu().setting.name
      })
      await appRepo.updatePageMeta({
        title: AppRepository.menu().setting.name,
        breadcrumb: [
          AppRepository.menu().home,
          AppRepository.menu().setting
        ]
      })
    })

    return {}
  }
})
</script>

<style lang="scss" scoped>
</style>
