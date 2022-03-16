<template>
  <Overview
      :endpointID="endpointID"
      :schemaID="schemaID"
      :version="version"/>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import Overview from '~/features/Schemas/Overview.vue'
import { middlewares } from '~/constants/middlewares'
import AppRepository from '~/repositories/AppRepository'
import { Context } from '@nuxt/types'

export default defineComponent({
  components: { Overview },
  middleware: [middlewares.auth, middlewares.admin],
  validate (ctx): boolean {
    return /^.*\(:\).*\(:\).*$/g.test(ctx.route.params.id)
  },
  async asyncData (ctx: Context) {
    const app = new AppRepository(ctx)
    await app.updatePageMeta({
      title: AppRepository.menu().schemas.name,
      breadcrumb: [
        AppRepository.menu().home,
        AppRepository.menu().schemas
      ]
    })

    await app.updateDocMeta({
      title: AppRepository.menu().schemas.name
    })
  },
  setup (props, context) {
    const route = useRoute()
    const ids = route.value.params.id.split('(:)')
    return {
      endpointID: ids[0],
      schemaID: ids[1],
      version: ids[2]
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
