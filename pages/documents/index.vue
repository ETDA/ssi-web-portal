<template>
  <DocumentManagement/>
</template>

<script lang="ts">
import {defineComponent, useAsync, useContext, useFetch} from '@nuxtjs/composition-api'
import AppRepository from '~/repositories/AppRepository'
import {layouts} from '~/constants/layout'
import DocumentManagement from '~/features/Documents/index.vue'
import DocumentRepository from '~/repositories/documents/DocumentRepository'
import {middlewares} from '~/constants/middlewares'

interface Props {
}

export default defineComponent<Props>({
  layout: layouts.default_secondary,
  components: {
    DocumentManagement
  },
  props: {},
  middleware: middlewares.auth,
  setup (props, context) {
    const ctx = useContext()
    const appRepo = new AppRepository(ctx)

    useAsync(async () => {
      await appRepo.updateDocMeta({
        title: appRepo.menu.document.name
      })
      await appRepo.updatePageMeta({
        title: appRepo.menu.document.name,
        breadcrumb: [
          appRepo.menu.home,
          appRepo.menu.document
        ]
      })
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
